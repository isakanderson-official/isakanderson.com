<script lang="ts">
	import Section from '#lib/components/Section.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import Stars from '#lib/components/Stars.svelte';
	import Status from '#lib/components/Status.svelte';
	import { site } from '#lib/site.ts';
	import { formatMonth } from '#lib/utils.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Seo />

<section class="flex flex-col gap-4">
	<h1 class="text-[clamp(44px,10vw,64px)] leading-[1.05] font-semibold tracking-[-0.02em]">
		{site.tagline}
	</h1>
	<p class="max-w-[560px]">
		Hi, I'm Isak. I build apps like <a href="/projects/prtytime">PrtyTime</a>, read more books than
		I probably should, and write down what I learn, from
		<a href="/writing/dslr-camera-setup">my camera setup</a> to
		<a href="/courses/paying-off-debt">how I paid off my debt</a>.
	</p>
</section>

<hr class="border-foreground" />

<Section label="Projects">
	<ul class="flex flex-col gap-2.5">
		{#each data.projects as project (project.slug)}
			<li>
				<a href="/projects/{project.slug}">{project.title}</a> — {project.description}
				<Status status={project.status} />
			</li>
		{/each}
		<li><a href="/projects" class="font-mono text-sm">all projects →</a></li>
	</ul>
</Section>

<Section label="Writing">
	<ul class="flex flex-col gap-2.5">
		{#each data.posts as post (post.slug)}
			<li class="flex justify-between gap-4">
				<a href="/writing/{post.slug}">{post.title}</a>
				<span class="meta whitespace-nowrap">{formatMonth(post.date)}</span>
			</li>
		{/each}
		<li><a href="/writing" class="font-mono text-sm">all writing →</a></li>
	</ul>
</Section>

<Section label="Courses">
	<ul class="flex flex-col gap-2.5">
		{#each data.courses as course (course.slug)}
			<li class="flex justify-between gap-4">
				<a href="/courses/{course.slug}">{course.title}</a>
				<span class="meta whitespace-nowrap">{course.lessons.length} lessons</span>
			</li>
		{/each}
	</ul>
</Section>

<Section label="Books">
	<div class="flex flex-col gap-2.5">
		{#if data.reading}
			<p>
				<em>Currently reading:</em>
				{data.reading.title} <span class="text-muted-foreground">by {data.reading.author}</span>
			</p>
		{/if}
		<ul class="flex flex-col gap-2.5">
			{#each data.books as book, i (i)}
				<li class="flex justify-between gap-4">
					<span>{book.title} <span class="text-muted-foreground">by {book.author}</span></span>
					{#if book.rating}<Stars rating={book.rating} />{/if}
				</li>
			{/each}
		</ul>
		<a href="/books" class="font-mono text-sm">all {data.bookCount} books →</a>
	</div>
</Section>
