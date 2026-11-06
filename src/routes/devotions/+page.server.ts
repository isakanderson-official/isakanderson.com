import { parseDevotions } from '#lib/devotions/parse.ts';
import { savedPlan, type Plan } from '#lib/devotions/plan.ts';
import type { PageServerLoad } from './$types';

// Rendered on request (not at build time) so it can pull the current week from thisishope.com.
export const prerender = false;

const SOURCE = 'https://www.thisishope.com/devotions';
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

	let live: Plan = {};
	try {
		const res = await fetch(SOURCE, {
			headers: { 'user-agent': 'isakanderson.com devotions page' },
			signal: AbortSignal.timeout(5000)
		});
		if (res.ok) live = parseDevotions(await res.text(), Number(todayKey.slice(0, 4)));
	} catch {
		// Fall back to the saved plan below.
	}

	return {
		today: todayKey,
		plan: { ...savedPlan, ...live },
		liveToday: Boolean(live[todayKey]),
		source: SOURCE
	};
};
