import { parseRef, type Plan } from './plan.ts';

const MONTHS = [
	'january',
	'february',
	'march',
	'april',
	'may',
	'june',
	'july',
	'august',
	'september',
	'october',
	'november',
	'december'
];

const decode = (s: string) =>
	s
		.replace(/<[^>]*>/g, '')
		.replace(/&amp;/g, '&')
		.replace(/&nbsp;|&#160;/g, ' ')
		.replace(/&#39;|&rsquo;/g, "'")
		.replace(/&quot;/g, '"')
		.replace(/\s+/g, ' ')
		.trim();

/**
 * Walks the page in document order: a date ("November 6, 2026", "Nov 6", "11/6") starts a
 * day, and each BibleGateway link after it is one of that day's readings. Deliberately loose
 * so small layout changes on their site don't break it.
 */
export function parseDevotions(html: string, fallbackYear: number): Plan {
	const plan: Plan = {};
	const token =
		/<a\b[^>]*href="(https?:\/\/(?:www\.)?biblegateway\.com\/passage\/?\?[^"]*)"[^>]*>([\s\S]*?)<\/a>|([A-Za-z]{3,9})\.?\s+(\d{1,2})(?:st|nd|rd|th)?(?:,?\s+(\d{4}))?|\b(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?\b/g;

	let day: string | null = null;
	const body = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, '');

	for (const m of body.matchAll(token)) {
		if (m[1]) {
			if (!day) continue;
			let ref = decode(m[2]);
			if (!ref) {
				const search = new URL(m[1].replace(/&amp;/g, '&')).searchParams.get('search');
				ref = search ?? '';
			}
			if (ref && !plan[day].includes(ref)) plan[day].push(ref);
			continue;
		}

		let month: number, date: number, year: number;
		if (m[3]) {
			month = MONTHS.findIndex((name) => name.startsWith(m[3].toLowerCase()) && m[3].length >= 3);
			if (month < 0 || (m[3].length > 3 && MONTHS[month] !== m[3].toLowerCase())) continue;
			date = Number(m[4]);
			year = m[5] ? Number(m[5]) : fallbackYear;
		} else {
			month = Number(m[6]) - 1;
			date = Number(m[7]);
			year = m[8] ? Number(m[8].length === 2 ? `20${m[8]}` : m[8]) : fallbackYear;
		}
		if (month < 0 || month > 11 || date < 1 || date > 31) continue;

		day = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
		plan[day] ??= [];
	}

	for (const key of Object.keys(plan)) if (!plan[key].length) delete plan[key];
	return plan;
}

/** Keys that identify a passage, e.g. "1TI.2" for a chapter or "PRO.10.22-32" for verses. */
export const passageKeys = (ref: string) => parseRef(ref).map((p) => p.usfm);

const WEEKDAY_LINK =
	/<a\b[^>]*href="((?:https?:\/\/(?:www\.)?thisishope\.com)?\/(sunday|monday|tuesday|wednesday|thursday|friday|saturday))\/?"[^>]*>([\s\S]*?)<\/a>/gi;

/**
 * Reads thisishope.com/the-bible-helps, where each weekday ("Monday: 2 Corinthians 1 | Psalm
 * 119:17-24") links to that day's notes, and returns passage key → notes URL. Only the English
 * day names match, so the Spanish section is ignored.
 */
export function parseBibleHelps(html: string, base: string): Record<string, string> {
	const helps: Record<string, string> = {};
	const body = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, '');
	const links = [...body.matchAll(WEEKDAY_LINK)];

	links.forEach((m, i) => {
		const url = new URL(m[1], base).href;
		const end = (m.index ?? 0) + m[0].length;
		const nextStart = links[i + 1]?.index ?? body.length;
		const prevEnd = i ? (links[i - 1].index ?? 0) + links[i - 1][0].length : 0;

		// The passages may be the link text itself, or sit just after or just before it.
		const candidates = [
			decode(m[3]),
			decode(body.slice(end, Math.min(nextStart, end + 400)).split(/<\/(?:li|p|div)>/i)[0]),
			decode(
				body
					.slice(Math.max(prevEnd, (m.index ?? 0) - 400), m.index)
					.split(/<(?:li|p|div)\b[^>]*>/i)
					.pop() ?? ''
			)
		];

		for (const text of candidates) {
			const refs = text
				.replace(/\b(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\b\s*[:\-–—]?/gi, '')
				.split(/\s*[|•·;]\s*/)
				.flatMap((part) => passageKeys(part.replace(/^[\s:–—-]+|[\s:–—-]+$/g, '')));
			if (!refs.length) continue;
			for (const key of refs) helps[key] ??= url;
			break;
		}
	});

	return helps;
}
