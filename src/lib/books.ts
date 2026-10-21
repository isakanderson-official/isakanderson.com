/*
 * Your bookshelf. Add a book by adding an entry here.
 *
 * Covers come from Open Library using the ISBN (find it on the book's page at openlibrary.org,
 * or on the back of the book). Without an ISBN, or if Open Library has no cover, a blank cover shows.
 */

export type Book = {
	title: string;
	author: string;
	/** ISBN-10 or ISBN-13, used to fetch the cover. */
	isbn?: string;
	/** 1–5 stars. Leave out while still reading. */
	rating?: 1 | 2 | 3 | 4 | 5;
	/** ISO date you finished it, e.g. 2026-10-21. Leave out while still reading. */
	dateRead?: string;
	/** Optional one-line take. */
	note?: string;
	/** Optional affiliate or shop link. */
	link?: string;
};

export const books: Book[] = [
	// TODO: replace these placeholders with your real books.
	{ title: '[Book title]', author: '[Author]' },
	{ title: '[Book title]', author: '[Author]', rating: 5, dateRead: '2026-09-01' },
	{ title: '[Book title]', author: '[Author]', rating: 4, dateRead: '2026-07-15' },
	{ title: '[Book title]', author: '[Author]', rating: 4, dateRead: '2026-05-02' },
	{ title: '[Book title]', author: '[Author]', rating: 3, dateRead: '2026-02-20' }
];

export function coverUrl(book: Book) {
	if (!book.isbn) return undefined;
	return `https://covers.openlibrary.org/b/isbn/${book.isbn.replace(/[^0-9X]/gi, '')}-M.jpg?default=false`;
}

/** Books with no `dateRead` count as currently reading. */
export function currentlyReading() {
	return books.filter((b) => !b.dateRead);
}

export function finishedBooks() {
	return books
		.filter((b): b is Book & { dateRead: string } => Boolean(b.dateRead))
		.sort((a, b) => b.dateRead.localeCompare(a.dateRead));
}
