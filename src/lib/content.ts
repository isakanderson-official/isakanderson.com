import type { Component } from 'svelte';
import { site } from '#lib/site.ts';

/*
 * All writing lives in /src/content as Markdown (mdsvex) files with YAML frontmatter.
 */

export type PostMeta = {
	title: string;
	/** ISO date, e.g. 2026-10-21 */
	date: string;
	description?: string;
	tags?: string[];
	/** Drafts show up in `pnpm dev` but are left out of the built site. */
	draft?: boolean;
};

export type ProjectStatus = 'live' | 'in progress' | 'archived';

export type ProjectMeta = {
	title: string;
	description: string;
	status: ProjectStatus;
	stack?: string[];
	url?: string;
	repo?: string;
	/** Short muted looping demo. A full URL, or a path inside the R2 bucket (see site.mediaUrl). */
	video?: string;
	/** Still image shown before the video loads. Same rules as `video`. */
	poster?: string;
	/** Lower numbers sort first. */
	order?: number;
	draft?: boolean;
};

export type CourseMeta = {
	title: string;
	description: string;
	order?: number;
	draft?: boolean;
};

export type LessonMeta = {
	title: string;
	description?: string;
};

export type Post = PostMeta & { slug: string };
export type Project = ProjectMeta & { slug: string };
export type Lesson = LessonMeta & { slug: string; number: number; path: string };
export type Course = CourseMeta & { slug: string; lessons: Lesson[] };

const showDrafts = import.meta.env.DEV;

type Module<T> = { metadata: T; default: Component };

// Content is small, so every file is bundled up front: listings need all the metadata anyway.
const postFiles = import.meta.glob<Module<PostMeta>>('/src/content/posts/*.md', { eager: true });
const projectFiles = import.meta.glob<Module<ProjectMeta>>('/src/content/projects/*.md', {
	eager: true
});
const courseFiles = import.meta.glob<Module<CourseMeta>>('/src/content/courses/*/index.md', {
	eager: true
});
const lessonFiles = import.meta.glob<Module<LessonMeta>>(
	['/src/content/courses/*/*.md', '!/src/content/courses/*/index.md'],
	{ eager: true }
);

/** `/src/content/posts/my-post.md` → `my-post` */
function stem(path: string) {
	return path.split('/').pop()!.replace(/\.md$/, '');
}

function visible<T extends { draft?: boolean }>(item: T) {
	return showDrafts || !item.draft;
}

export function mediaUrl(path: string | undefined) {
	if (!path) return undefined;
	return /^https?:\/\//.test(path) ? path : `${site.mediaUrl}/${path.replace(/^\//, '')}`;
}

export function getPosts(): Post[] {
	return Object.entries(postFiles)
		.map(([path, file]) => ({
			...file.metadata,
			// YAML turns `2026-10-21` into a full timestamp; keep just the day.
			date: String(file.metadata.date).slice(0, 10),
			slug: stem(path)
		}))
		.filter(visible)
		.sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string) {
	const post = getPosts().find((p) => p.slug === slug);
	if (!post) return undefined;
	return { post, content: postFiles[`/src/content/posts/${slug}.md`].default };
}

export function getProjects(): Project[] {
	return Object.entries(projectFiles)
		.map(([path, file]) => ({ ...file.metadata, slug: stem(path) }))
		.filter(visible)
		.sort((a, b) => (a.order ?? 99) - (b.order ?? 99) || a.title.localeCompare(b.title));
}

export function getProject(slug: string) {
	const project = getProjects().find((p) => p.slug === slug);
	if (!project) return undefined;
	return { project, content: projectFiles[`/src/content/projects/${slug}.md`].default };
}

/** Lesson files are named `01-first-lesson.md`; the number sets the order and is dropped from the URL. */
function lessonsFor(course: string): Lesson[] {
	return Object.entries(lessonFiles)
		.filter(([path]) => path.startsWith(`/src/content/courses/${course}/`))
		.map(([path, file]) => {
			const match = stem(path).match(/^(\d+)-(.+)$/);
			return {
				...file.metadata,
				number: match ? Number(match[1]) : 0,
				slug: match ? match[2] : stem(path),
				path
			};
		})
		.sort((a, b) => a.number - b.number);
}

export function getCourses(): Course[] {
	return Object.entries(courseFiles)
		.map(([path, file]) => {
			const slug = path.split('/').at(-2)!;
			return { ...file.metadata, slug, lessons: lessonsFor(slug) };
		})
		.filter(visible)
		.sort((a, b) => (a.order ?? 99) - (b.order ?? 99) || a.title.localeCompare(b.title));
}

export function getCourse(slug: string) {
	const course = getCourses().find((c) => c.slug === slug);
	if (!course) return undefined;
	return { course, content: courseFiles[`/src/content/courses/${slug}/index.md`].default };
}

export function getLesson(courseSlug: string, lessonSlug: string) {
	const course = getCourses().find((c) => c.slug === courseSlug);
	const index = course?.lessons.findIndex((l) => l.slug === lessonSlug) ?? -1;
	if (!course || index === -1) return undefined;

	const lesson = course.lessons[index];
	return {
		course,
		lesson,
		previous: course.lessons[index - 1],
		next: course.lessons[index + 1],
		content: lessonFiles[lesson.path].default
	};
}
