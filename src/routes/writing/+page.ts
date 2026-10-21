import { getPosts } from '#lib/content.ts';
import type { PageLoad } from './$types';

export const load: PageLoad = () => ({ posts: getPosts() });
