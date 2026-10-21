<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Seo title="Courses" description="Short, free courses on things I've figured out the hard way." />

<section class="flex flex-col gap-4">
	<h1 class="text-5xl leading-tight font-semibold tracking-[-0.02em]">Courses</h1>
	<p>Short, free courses on things I've figured out the hard way. No signup needed.</p>
</section>

<ul class="flex flex-col gap-6">
	{#each data.courses as course (course.slug)}
		<li class="flex flex-col gap-0.5">
			<a href="/courses/{course.slug}" class="text-[22px]">{course.title}</a>
			<p>{course.description}</p>
			<p class="meta">{course.lessons.length} lessons · free</p>
		</li>
	{/each}
</ul>
