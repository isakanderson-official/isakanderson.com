import { error } from '@sveltejs/kit';
import { getCourses, getLesson } from '#lib/content.ts';
import type { EntryGenerator, PageLoad } from './$types';

// 'auto' so the build still passes when every course is a draft and there is nothing to prerender.
export const prerender = 'auto';

export const entries: EntryGenerator = () =>
	getCourses().flatMap((course) =>
		course.lessons.map((lesson) => ({ course: course.slug, lesson: lesson.slug }))
	);

export const load: PageLoad = ({ params }) => {
	const result = getLesson(params.course, params.lesson);
	if (!result) error(404, 'Lesson not found');
	return result;
};
