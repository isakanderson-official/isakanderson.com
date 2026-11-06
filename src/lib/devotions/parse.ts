import type { Plan } from './plan.ts';

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
