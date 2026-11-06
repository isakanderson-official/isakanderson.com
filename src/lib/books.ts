import { amazonSearchUrl } from '#lib/content.ts';

/*
 * Your bookshelf. Add a book by adding an entry here.
 *
 * Covers live in static/books/<isbn>.webp. After adding a book with an ISBN (find it on the book's
 * page at openlibrary.org, or on the back of the book), run `pnpm covers` to download its cover from
 * Open Library. If Open Library has none, save a WebP there by hand. Without one, a blank cover shows.
 *
 * Every book links to an Amazon search for its title and author, tagged with site.amazonTag.
 * Set `link` to point a book somewhere specific instead.
 */

export type Book = {
	title: string;
	author: string;
	/** ISBN-10 or ISBN-13, used to find the cover. */
	isbn?: string;
	/** 1–5 stars. Leave out while still reading. */
	rating?: 1 | 2 | 3 | 4 | 5;
	/** ISO date you finished it, e.g. 2026-10-21. Leave out if you don't remember. */
	dateRead?: string;
	/** Shows the book under "Currently reading". */
	reading?: boolean;
	/** Optional one-line take. */
	note?: string;
	/** Overrides the default Amazon link. */
	link?: string;
};

export const books: Book[] = [
	{
		title: 'Tech-Wise Family',
		author: 'Andy Crouch',
		isbn: '9780801018664',
		dateRead: '2026-09-02'
	},
	{ title: 'Cribsheet', author: 'Emily Oster', isbn: '9780525559252', dateRead: '2026-08-12' },
	{
		title: 'The Happiest Baby Guide to Great Sleep',
		author: 'Harvey Karp',
		isbn: '9780062113320',
		dateRead: '2026-08-11'
	},
	{
		title: 'The $100 Startup',
		author: 'Chris Guillebeau',
		isbn: '9780307951526',
		dateRead: '2026-04-24'
	},
	{
		title: 'Rework',
		author: 'Jason Fried, David Heinemeier Hansson',
		isbn: '9781785043024',
		dateRead: '2026-04-17'
	},
	{
		title: 'Zero to One',
		author: 'Peter Thiel, Blake Masters',
		isbn: '9780804165259',
		dateRead: '2024-12-18'
	},
	{ title: 'Atomic Habits', author: 'James Clear', isbn: '9781804220207', dateRead: '2024-10-10' },
	{
		title: 'The Innovators',
		author: 'Walter Isaacson',
		isbn: '9781476708690',
		dateRead: '2024-07-20'
	},
	{
		title: 'The Female Brain',
		author: 'Louann Brizendine',
		isbn: '9780767920094',
		dateRead: '2020-05-18'
	},
	{
		title: 'Boundaries',
		author: 'Henry Cloud, John Townsend',
		isbn: '9780310351801',
		dateRead: '2020-04-24'
	},
	{
		title: 'Keep Your Love On',
		author: 'Danny Silk',
		isbn: '9780988499232',
		dateRead: '2020-04-05'
	},
	{
		title: 'Who Moved My Cheese?',
		author: 'Spencer Johnson',
		isbn: '9780399147241',
		dateRead: '2026-03-01'
	},
	{
		title: 'Vibe Coding',
		author: 'Gene Kim, Steve Yegge',
		isbn: '9781966280026',
		dateRead: '2026-08-01'
	},
	{ title: 'Think and Grow Rich', author: 'Napoleon Hill', isbn: '9781585424337' },
	{ title: 'The Meaning of Marriage', author: 'Timothy Keller', isbn: '9780525952473' },
	{
		title: 'Chase the Lion',
		author: 'Mark Batterson',
		isbn: '9781601428851',
		dateRead: '2025-06-01'
	},
	{ title: 'How to Talk to Anyone', author: 'Leil Lowndes', isbn: '9780071418584' },
	{
		title: 'The 7 Habits of Highly Effective People',
		author: 'Stephen R. Covey',
		isbn: '9781982137137'
	},
	{ title: 'The ONE Thing', author: 'Gary Keller, Jay Papasan', isbn: '9781848549258' },
	{
		title: 'The 22 Immutable Laws of Marketing',
		author: 'Al Ries, Jack Trout',
		isbn: '088730592X'
	},

	{
		title: 'Multipliers',
		author: 'Liz Wiseman',
		isbn: '9780062663078',
		dateRead: '2026-01-01'
	},
	{
		title: 'X: Multiply Your God-Given Potential',
		author: 'John Bevere',
		isbn: '9781937558253',
		dateRead: '2025-10-01'
	},
	{ title: 'Reset', author: 'Dan Heath', isbn: '9781668062104' },
	{
		title: 'The Lean Startup',
		author: 'Eric Ries',
		isbn: '9780307887894',
		dateRead: '2026-01-01'
	},
	{
		title: 'Leaders Eat Last',
		author: 'Simon Sinek',
		isbn: '9780670923175',
		dateRead: '2025-11-01'
	}
];

export function coverUrl(book: Book) {
	if (!book.isbn) return undefined;
	return `/books/${book.isbn.replace(/[^0-9X]/gi, '').toUpperCase()}.webp`;
}

export function currentlyReading() {
	return books.filter((b) => b.reading);
}

export function bookUrl(book: Book) {
	return book.link ?? amazonSearchUrl(`${book.title} ${book.author}`, 'stripbooks');
}

/** Newest first; books without a `dateRead` go last. */
export function finishedBooks() {
	return books
		.filter((b) => !b.reading)
		.sort((a, b) => (b.dateRead ?? '').localeCompare(a.dateRead ?? ''));
}
