import { getProjects } from '#lib/content.ts';
import type { PageLoad } from './$types';

export const load: PageLoad = () => ({ projects: getProjects() });
