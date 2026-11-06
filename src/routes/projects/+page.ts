import { error } from '@sveltejs/kit';
import { getProjects } from '#lib/content.ts';
import type { PageLoad } from './$types';

export const prerender = getProjects().length > 0;

export const load: PageLoad = () => {
	const projects = getProjects();
	if (!projects.length) error(404, 'Not found');
	return { projects };
};
