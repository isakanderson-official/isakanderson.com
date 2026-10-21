<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import { formatDate } from '#lib/utils.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const post = $derived(data.post);
</script>

<Seo title={post.title} description={post.description} />

<article class="flex flex-col gap-8">
	<header class="flex flex-col gap-3">
		<a href="/writing" class="font-mono text-sm">← writing</a>
		<h1 class="text-[clamp(36px,8vw,48px)] leading-tight font-semibold tracking-[-0.02em]">
			{post.title}
		</h1>
		<p class="meta">
			{formatDate(post.date)}{#if post.tags?.length}&nbsp;· {post.tags.join(', ')}{/if}
		</p>
	</header>

	<div class="prose">
		<data.content />
	</div>
</article>
