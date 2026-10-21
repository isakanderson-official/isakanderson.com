<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import { Button } from '#lib/components/ui/button/index.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const course = $derived(data.course);
</script>

<Seo title={course.title} description={course.description} />

<article class="flex flex-col gap-8">
	<header class="flex flex-col gap-3">
		<a href="/courses" class="font-mono text-sm">← courses</a>
		<h1 class="text-[clamp(36px,8vw,48px)] leading-tight font-semibold tracking-[-0.02em]">
			{course.title}
		</h1>
		<p>{course.description}</p>
		<p class="meta">{course.lessons.length} lessons · free</p>
	</header>

	<div class="prose">
		<data.content />
	</div>

	<section class="flex flex-col gap-3">
		<h2 class="label">Lessons</h2>
		<ol class="flex flex-col gap-2.5">
			{#each course.lessons as lesson (lesson.slug)}
				<li class="flex gap-3">
					<span class="meta pt-1">{String(lesson.number).padStart(2, '0')}</span>
					<a href="/courses/{course.slug}/{lesson.slug}">{lesson.title}</a>
				</li>
			{/each}
		</ol>
	</section>

	{#if course.lessons[0]}
		<div>
			<Button href="/courses/{course.slug}/{course.lessons[0].slug}">start the course →</Button>
		</div>
	{/if}
</article>
