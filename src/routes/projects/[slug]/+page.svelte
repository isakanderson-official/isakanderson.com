<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import Status from '#lib/components/Status.svelte';
	import Video from '#lib/components/Video.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const project = $derived(data.project);
</script>

<Seo title={project.title} description={project.description} />

<article class="flex flex-col gap-6">
	<header class="flex flex-col gap-3">
		<a href="/projects" class="font-mono text-sm">← projects</a>
		<h1 class="text-5xl leading-tight font-semibold tracking-[-0.02em]">{project.title}</h1>
		<p>{project.description}</p>
		<p class="meta flex flex-wrap gap-x-4 gap-y-1">
			<Status status={project.status} />
			{#if project.url}<a href={project.url}>visit site ↗</a>{/if}
			{#if project.repo}<a href={project.repo}>source ↗</a>{/if}
		</p>
		{#if project.stack?.length}
			<p class="meta">built with {project.stack.join(' · ')}</p>
		{/if}
	</header>

	{#if project.video}
		<Video src={project.video} poster={project.poster} label="{project.title} demo" />
	{/if}

	<div class="prose">
		<data.content />
	</div>
</article>
