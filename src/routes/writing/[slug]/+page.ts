import { error } from '@sveltejs/kit';
import { getPost, getPosts } from '#lib/content.ts';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => getPosts().map(({ slug }) => ({ slug }));

export const load: PageLoad = ({ params }) => {
	const result = getPost(params.slug);
	if (!result) error(404, 'Post not found');
	return result;
};
