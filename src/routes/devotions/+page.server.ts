import { parseBibleHelps, parseDevotions } from '#lib/devotions/parse.ts';
import { savedPlan, type Plan } from '#lib/devotions/plan.ts';
import type { PageServerLoad } from './$types';

// Rendered on request (not at build time) so it can pull the current week from thisishope.com.
export const prerender = false;

const SOURCE = 'https://www.thisishope.com/devotions';
const BIBLE_HELPS = 'https://www.thisishope.com/the-bible-helps';
const TIME_ZONE = 'America/Los_Angeles';

/** Today's date as YYYY-MM-DD in Pacific time. */
function today(): string {
	return new Intl.DateTimeFormat('en-CA', {
		timeZone: TIME_ZONE,
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	}).format(new Date());
}

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
	const todayKey = today();

	// Keep this page out of search engines; it's only for people with the link.
	setHeaders({
		'x-robots-tag': 'noindex, nofollow',
		'cache-control': 'public, max-age=900'
	});

	const get = async (url: string) => {
		try {
			const res = await fetch(url, {
				headers: { 'user-agent': 'isakanderson.com devotions page' },
				signal: AbortSignal.timeout(5000)
			});
			return res.ok ? await res.text() : null;
		} catch {
			return null;
		}
	};

	// Missing or unreachable pages fall back to the saved plan and the main Bible Helps page.
	const [devotionsHtml, helpsHtml] = await Promise.all([get(SOURCE), get(BIBLE_HELPS)]);
	const live: Plan = devotionsHtml
		? parseDevotions(devotionsHtml, Number(todayKey.slice(0, 4)))
		: {};
	const helps = helpsHtml ? parseBibleHelps(helpsHtml, BIBLE_HELPS) : {};

	return {
		today: todayKey,
		plan: { ...savedPlan, ...live },
		liveToday: Boolean(live[todayKey]),
		source: SOURCE,
		helps,
		helpsIndex: BIBLE_HELPS
	};
};
