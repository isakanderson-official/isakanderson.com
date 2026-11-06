import { error } from '@sveltejs/kit';
import { getCourses } from '#lib/content.ts';
import type { PageLoad } from './$types';

export const prerender = getCourses().length > 0;

export const load: PageLoad = () => {
	const courses = getCourses();
	if (!courses.length) error(404, 'Not found');
	return { courses };
};
