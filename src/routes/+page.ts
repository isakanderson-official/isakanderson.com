import { currentlyReading, finishedBooks } from '#lib/books.ts';
import { getCourses, getPosts, getProjects } from '#lib/content.ts';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		projects: getProjects().slice(0, 4),
		posts: getPosts().slice(0, 3),
		courses: getCourses(),
		reading: currentlyReading()[0],
		books: finishedBooks().slice(0, 3),
		bookCount: finishedBooks().length
	};
};
