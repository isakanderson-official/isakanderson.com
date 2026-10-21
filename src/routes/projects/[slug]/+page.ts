import { error } from '@sveltejs/kit';
import { getProject, getProjects } from '#lib/content.ts';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => getProjects().map(({ slug }) => ({ slug }));

export const load: PageLoad = ({ params }) => {
	const result = getProject(params.slug);
	if (!result) error(404, 'Project not found');
	return result;
};
