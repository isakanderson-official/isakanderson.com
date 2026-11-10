/**
 * Living Hope (thisishope.com) daily Bible reading plan, plus helpers that turn a
 * reference like "Zephaniah 1 & 2" into YouVersion (NLT) deep links.
 *
 * The /devotions page fetches thisishope.com live; this saved copy is the fallback for
 * days the live page doesn't cover or when it can't be reached.
 */

/** Dates are YYYY-MM-DD in Pacific time (the church is in Beaverton, OR). */
export type Plan = Record<string, string[]>;

export const savedPlan: Plan = {
	'2026-11-01': ['Colossians 3', 'Proverbs 7:10-20'],
	'2026-11-02': ['Colossians 4', 'Proverbs 7:21-27'],
	'2026-11-03': ['Zephaniah 1 & 2', 'Proverbs 8:1-11'],
	'2026-11-04': ['Zephaniah 3', 'Proverbs 8:12-21'],
	'2026-11-05': ['1 Thessalonians 1 & 2', 'Proverbs 8:22-36'],
	'2026-11-06': ['1 Thessalonians 3 & 4', 'Proverbs 9:1-9'],
	'2026-11-07': ['1 Thessalonians 5', 'Proverbs 9:10-18'],
	'2026-11-08': ['2 Thessalonians 1 & 2', 'Proverbs 10:1-11'],
	'2026-11-09': ['2 Thessalonians 3', 'Proverbs 10:12-21'],
	'2026-11-10': ['1 Timothy 1', 'Proverbs 10:22-32'],
	'2026-11-11': ['1 Timothy 2 & 3', 'Proverbs 11:1-10'],
	'2026-11-12': ['1 Timothy 4', 'Proverbs 11:11-20'],
	'2026-11-13': ['1 Timothy 5', 'Proverbs 11:21-31'],
	'2026-11-14': ['1 Timothy 6', 'Proverbs 12:1-9'],
	'2026-11-15': ['2 Timothy 1', 'Proverbs 12:10-18'],
	'2026-11-16': ['2 Timothy 2', 'Proverbs 12:19-28'],
	'2026-11-17': ['2 Timothy 3', 'Proverbs 13:1-12'],
	'2026-11-18': ['2 Timothy 4', 'Proverbs 13:13-25'],
	'2026-11-19': ['Titus 1', 'Proverbs 14:1-11'],
	'2026-11-20': ['Titus 2 & 3', 'Proverbs 14:12-23'],
	'2026-11-21': ['Philemon', 'Proverbs 14:24-35'],
	'2026-11-22': ['Hebrews 1 & 2', 'Proverbs 15:1-11'],
	'2026-11-23': ['Hebrews 3 & 4', 'Proverbs 15:12-22'],
	'2026-11-24': ['Hebrews 5 & 6', 'Proverbs 15:23-33'],
	'2026-11-25': ['Hebrews 7', 'Proverbs 16:1-11'],
	'2026-11-26': ['Hebrews 8', 'Proverbs 16:12-22'],
	'2026-11-27': ['Hebrews 9', 'Proverbs 16:23-33'],
	'2026-11-28': ['Hebrews 10', 'Proverbs 17:1-9'],
	'2026-11-29': ['Hebrews 11', 'Proverbs 17:10-18'],
	'2026-11-30': ['Hebrews 12', 'Proverbs 17:19-28'],
	'2026-12-01': ['Hebrews 13', 'Proverbs 18:1-12'],
	'2026-12-02': ['James 1', 'Proverbs 18:13-24'],
	'2026-12-03': ['James 2', 'Proverbs 19:1-10'],
	'2026-12-04': ['James 3 & 4', 'Proverbs 19:11-20'],
	'2026-12-05': ['James 5', 'Proverbs 19:21-29'],
	'2026-12-06': ['1 Peter 1', 'Proverbs 20:1-10'],
	'2026-12-07': ['1 Peter 2', 'Proverbs 20:11-20'],
	'2026-12-08': ['1 Peter 3', 'Proverbs 20:21-30'],
	'2026-12-09': ['1 Peter 4 & 5', 'Proverbs 21:1-10'],
	'2026-12-10': ['2 Peter 1', 'Proverbs 21:11-20'],
	'2026-12-11': ['2 Peter 2', 'Proverbs 21:21-31'],
	'2026-12-12': ['2 Peter 3', 'Proverbs 22:1-8'],
	'2026-12-13': ['1 John 1', 'Proverbs 22:9-16'],
	'2026-12-14': ['1 John 2', 'Proverbs 22:17-29'],
	'2026-12-15': ['1 John 3', 'Proverbs 23:1-11'],
	'2026-12-16': ['1 John 4', 'Proverbs 23:12-21'],
	'2026-12-17': ['1 John 5', 'Proverbs 23:22-35'],
	'2026-12-18': ['2 & 3 John', 'Proverbs 24:1-12'],
	'2026-12-19': ['Jude', 'Proverbs 24:13-22'],
	'2026-12-20': ['Revelation 1', 'Proverbs 24:23-34'],
	'2026-12-21': ['Revelation 2', 'Proverbs 25:1-10'],
	'2026-12-22': ['Revelation 3', 'Proverbs 25:11-20'],
	'2026-12-23': ['Revelation 4', 'Proverbs 25:21-28'],
	'2026-12-24': ['Revelation 5', 'Proverbs 26:1-9'],
	'2026-12-25': ['Revelation 6', 'Proverbs 26:10-17'],
	'2026-12-26': ['Revelation 7', 'Proverbs 26:18-28'],
	'2026-12-27': ['Revelation 8', 'Proverbs 27:1-9'],
	'2026-12-28': ['Revelation 9', 'Proverbs 27:10-18'],
	'2026-12-29': ['Revelation 10', 'Proverbs 27:19-27'],
	'2026-12-30': ['Revelation 11', 'Proverbs 28:1-9'],
	'2026-12-31': ['Revelation 12', 'Proverbs 28:10-18']
};

/** USFM book codes, as used in YouVersion / bible.com URLs. */
const BOOKS: Record<string, string> = {
	genesis: 'GEN',
	exodus: 'EXO',
	leviticus: 'LEV',
	numbers: 'NUM',
	deuteronomy: 'DEU',
	joshua: 'JOS',
	judges: 'JDG',
	ruth: 'RUT',
	'1 samuel': '1SA',
	'2 samuel': '2SA',
	'1 kings': '1KI',
	'2 kings': '2KI',
	'1 chronicles': '1CH',
	'2 chronicles': '2CH',
	ezra: 'EZR',
	nehemiah: 'NEH',
	esther: 'EST',
	job: 'JOB',
	psalm: 'PSA',
	psalms: 'PSA',
	proverbs: 'PRO',
	ecclesiastes: 'ECC',
	'song of solomon': 'SNG',
	'song of songs': 'SNG',
	isaiah: 'ISA',
	jeremiah: 'JER',
	lamentations: 'LAM',
	ezekiel: 'EZK',
	daniel: 'DAN',
	hosea: 'HOS',
	joel: 'JOL',
	amos: 'AMO',
	obadiah: 'OBA',
	jonah: 'JON',
	micah: 'MIC',
	nahum: 'NAM',
	habakkuk: 'HAB',
	zephaniah: 'ZEP',
	haggai: 'HAG',
	zechariah: 'ZEC',
	malachi: 'MAL',
	matthew: 'MAT',
	mark: 'MRK',
	luke: 'LUK',
	john: 'JHN',
	acts: 'ACT',
	romans: 'ROM',
	'1 corinthians': '1CO',
	'2 corinthians': '2CO',
	galatians: 'GAL',
	ephesians: 'EPH',
	philippians: 'PHP',
	colossians: 'COL',
	'1 thessalonians': '1TH',
	'2 thessalonians': '2TH',
	'1 timothy': '1TI',
	'2 timothy': '2TI',
	titus: 'TIT',
	philemon: 'PHM',
	hebrews: 'HEB',
	james: 'JAS',
	'1 peter': '1PE',
	'2 peter': '2PE',
	'1 john': '1JN',
	'2 john': '2JN',
	'3 john': '3JN',
	jude: 'JUD',
	revelation: 'REV'
};
const ONE_CHAPTER = new Set(['OBA', 'PHM', '2JN', '3JN', 'JUD']);

/** YouVersion's id for the New Living Translation. */
const NLT = 116;

export type Passage = { label: string; usfm: string; chapter: string };

const bookCode = (name: string) =>
	BOOKS[
		name
			.toLowerCase()
			.replace(/\s+/g, ' ')
			.replace(/^(i{1,3})\s/, (r) => `${r.trim().length} `)
	];

/** "Zephaniah 1 & 2" → one passage per chapter; "Proverbs 7:10-20" → one passage with verses. */
export function parseRef(input: string): Passage[] {
	const ref = input.replace(/\s+/g, ' ').trim();

	// "2 & 3 John"
	let m = ref.match(/^(\d)\s*(?:&|and|-)\s*(\d)\s+(.+)$/i);
	if (m) {
		return [m[1], m[2]].flatMap((n) => {
			const code = bookCode(`${n} ${m![3]}`);
			return code ? [{ label: `${n} ${m![3]}`, usfm: `${code}.1`, chapter: `${code}.1` }] : [];
		});
	}

	// Whole one-chapter book: "Philemon", "Jude"
	const whole = bookCode(ref);
	if (whole) return [{ label: ref, usfm: `${whole}.1`, chapter: `${whole}.1` }];

	m = ref.match(/^(.+?)\s+(\d+(?:\s*(?:&|and|,|-)\s*\d+)*)(?::(\d+(?:-\d+)?))?$/i);
	if (!m) return [];
	const code = bookCode(m[1]);
	if (!code) return [];
	const verses = m[3];

	let chapters: number[];
	if (!verses && /-/.test(m[2])) {
		const [a, b] = m[2].split('-').map(Number);
		chapters = Array.from({ length: Math.max(0, b - a) + 1 }, (_, i) => a + i);
	} else {
		chapters = m[2].split(/\s*(?:&|and|,)\s*/i).map(Number);
	}

	return chapters.map((c) => ({
		label: ONE_CHAPTER.has(code) ? m![1] : `${m![1]} ${c}${verses ? `:${verses}` : ''}`,
		usfm: `${code}.${c}${verses ? `.${verses}` : ''}`,
		chapter: `${code}.${c}`
	}));
}

/** Opens the passage in the YouVersion app when installed (universal link), else bible.com. */
export const readUrl = (p: Passage) => `https://www.bible.com/bible/${NLT}/${p.usfm}.NLT`;

export const searchUrl = (ref: string) =>
	`https://www.bible.com/search/bible?q=${encodeURIComponent(ref)}&version_id=${NLT}`;
