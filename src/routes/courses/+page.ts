import { getCourses } from '#lib/content.ts';
import type { PageLoad } from './$types';

export const load: PageLoad = () => ({ courses: getCourses() });
