import { error } from '@sveltejs/kit';
import { getCourse, getCourses } from '#lib/content.ts';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => getCourses().map(({ slug }) => ({ course: slug }));

export const load: PageLoad = ({ params }) => {
	const result = getCourse(params.course);
	if (!result) error(404, 'Course not found');
	return result;
};
