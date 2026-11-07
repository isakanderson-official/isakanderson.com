import type { D1Database } from '@cloudflare/workers-types';
import { error, json } from '@sveltejs/kit';
import { env } from 'cloudflare:workers';
import { MAX_CLAPS, type ClapState } from '#lib/claps.ts';
import { getPost } from '#lib/content.ts';
import type { RequestEvent, RequestHandler } from './$types';

export const prerender = false;

/** IPv6 users usually get a whole /64, so treat the prefix as one reader. */
function readerAddress(ip: string) {
	if (!ip.includes(':')) return ip;
	const [head, tail = ''] = ip.split('::');
	const left = head ? head.split(':') : [];
	const right = tail ? tail.split(':') : [];
	const groups = [...left, ...Array(8 - left.length - right.length).fill('0'), ...right];
	return groups.slice(0, 4).join(':');
}

/** Keyed hash so the database never holds anything that can be turned back into an IP. */
async function voterId(slug: string, ip: string, secret: string) {
	const enc = new TextEncoder();
	const key = await crypto.subtle.importKey(
		'raw',
		enc.encode(secret),
		{ name: 'HMAC', hash: 'SHA-256' },
		false,
		['sign']
	);
	const sig = await crypto.subtle.sign('HMAC', key, enc.encode(`${slug}|${readerAddress(ip)}`));
	return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, '0')).join('');
}

async function context({ params, getClientAddress }: RequestEvent) {
	if (!getPost(params.slug)) error(404, 'Post not found');
	if (!env.DB || !env.CLAPS_SECRET) error(503, 'Claps are not configured');
	const voter = await voterId(params.slug, getClientAddress(), env.CLAPS_SECRET);
	return { db: env.DB, slug: params.slug, voter };
}

async function readState(db: D1Database, slug: string, voter: string): Promise<ClapState> {
	const [total, mine] = await db.batch<{ n: number }>([
		db.prepare('SELECT total AS n FROM clap_totals WHERE slug = ?1').bind(slug),
		db
			.prepare('SELECT count AS n FROM clap_voters WHERE slug = ?1 AND voter = ?2')
			.bind(slug, voter)
	]);
	return { total: total.results[0]?.n ?? 0, mine: mine.results[0]?.n ?? 0 };
}

export const GET: RequestHandler = async (event) => {
	const { db, slug, voter } = await context(event);
	return json(await readState(db, slug, voter), { headers: { 'cache-control': 'no-store' } });
};

export const POST: RequestHandler = async (event) => {
	const { request, url } = event;
	if (request.headers.get('origin') !== url.origin) error(403, 'Cross-site request');

	const body = await request.json().catch(() => null);
	const count = body?.count;
	if (!Number.isInteger(count) || count < 1 || count > MAX_CLAPS) error(400, 'Invalid count');

	const { db, slug, voter } = await context(event);

	// Readers who are already at the limit cost a read, never a write.
	const before = await readState(db, slug, voter);
	if (before.mine >= MAX_CLAPS) return json(before);

	// A batch runs as one transaction, so parallel requests can't push a reader past the limit.
	const [total, mine] = await db.batch<{ n: number }>([
		db
			.prepare(
				`INSERT INTO clap_totals (slug, total)
				VALUES (?1, MAX(0, MIN(?3, ?4 - COALESCE((SELECT count FROM clap_voters WHERE slug = ?1 AND voter = ?2), 0))))
				ON CONFLICT (slug) DO UPDATE SET total = total + excluded.total
				RETURNING total AS n`
			)
			.bind(slug, voter, count, MAX_CLAPS),
		db
			.prepare(
				`INSERT INTO clap_voters (slug, voter, count)
				VALUES (?1, ?2, MIN(?3, ?4))
				ON CONFLICT (slug, voter) DO UPDATE SET count = MIN(?4, count + excluded.count)
				RETURNING count AS n`
			)
			.bind(slug, voter, count, MAX_CLAPS)
	]);

	return json({ total: total.results[0].n, mine: mine.results[0].n } satisfies ClapState);
};
