<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import Status from '#lib/components/Status.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Seo title="Projects" description="Apps and tools I've built." />

<section class="flex flex-col gap-4">
	<h1 class="text-5xl leading-tight font-semibold tracking-[-0.02em]">Projects</h1>
	<p>Things I've built, from live apps to experiments.</p>
</section>

<ul class="flex flex-col gap-8">
	{#each data.projects as project (project.slug)}
		<li class="flex flex-col gap-1">
			<div class="flex flex-wrap items-baseline justify-between gap-x-4">
				<a href="/projects/{project.slug}" class="text-[22px]">{project.title}</a>
				<Status status={project.status} />
			</div>
			<p>{project.description}</p>
			{#if project.stack?.length}
				<p class="meta">{project.stack.join(' · ')}</p>
			{/if}
		</li>
	{/each}
</ul>
