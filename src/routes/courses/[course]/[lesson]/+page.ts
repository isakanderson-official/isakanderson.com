import { error } from '@sveltejs/kit';
import { getCourses, getLesson } from '#lib/content.ts';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () =>
	getCourses().flatMap((course) =>
		course.lessons.map((lesson) => ({ course: course.slug, lesson: lesson.slug }))
	);

export const load: PageLoad = ({ params }) => {
	const result = getLesson(params.course, params.lesson);
	if (!result) error(404, 'Lesson not found');
	return result;
};
