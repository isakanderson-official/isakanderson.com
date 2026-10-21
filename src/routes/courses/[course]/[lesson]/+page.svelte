<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import { Button } from '#lib/components/ui/button/index.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const { course, lesson, previous, next } = $derived(data);
	const lessonNumber = (n: number) => String(n).padStart(2, '0');
</script>

<Seo
	title="{lesson.title} · {course.title}"
	description={lesson.description ?? course.description}
/>

<article class="flex flex-col gap-8">
	<header class="flex flex-col gap-3">
		<a href="/courses/{course.slug}" class="font-mono text-sm">← {course.title}</a>
		<p class="label">Lesson {lesson.number} of {course.lessons.length}</p>
		<h1 class="text-[clamp(36px,8vw,48px)] leading-tight font-semibold tracking-[-0.02em]">
			{lesson.title}
		</h1>
	</header>

	<div class="prose">
		<data.content />
	</div>

	<nav aria-label="Lessons" class="flex flex-wrap justify-between gap-3">
		{#if previous}
			<Button variant="outline" href="/courses/{course.slug}/{previous.slug}">
				← {previous.title}
			</Button>
		{:else}
			<span></span>
		{/if}
		{#if next}
			<Button href="/courses/{course.slug}/{next.slug}">{next.title} →</Button>
		{:else}
			<Button variant="outline" href="/courses/{course.slug}">finish: back to the course</Button>
		{/if}
	</nav>

	<details class="border-t border-foreground pt-4">
		<summary class="label cursor-pointer">All lessons</summary>
		<ol class="mt-3 flex flex-col gap-2">
			{#each course.lessons as item (item.slug)}
				<li class="flex gap-3">
					<span class="meta pt-1">{lessonNumber(item.number)}</span>
					{#if item.slug === lesson.slug}
						<span aria-current="page" class="font-semibold">{item.title}</span>
					{:else}
						<a href="/courses/{course.slug}/{item.slug}">{item.title}</a>
					{/if}
				</li>
			{/each}
		</ol>
	</details>
</article>
