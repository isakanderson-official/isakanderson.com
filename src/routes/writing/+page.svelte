<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import { formatDate } from '#lib/utils.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Seo
	title="Writing"
	description="Posts on gear, money, building apps, and whatever else I'm learning."
/>

<section class="flex flex-col gap-4">
	<h1 class="text-5xl leading-tight font-semibold tracking-[-0.02em]">Writing</h1>
	<p>Gear, money, building apps, and whatever else I'm learning. <a href="/rss.xml">RSS</a>.</p>
</section>

<ul class="flex flex-col gap-6">
	{#each data.posts as post (post.slug)}
		<li class="flex flex-col gap-0.5">
			<a href="/writing/{post.slug}" class="text-[22px]">{post.title}</a>
			{#if post.description}<p>{post.description}</p>{/if}
			<p class="meta">
				{formatDate(post.date)}{#if post.tags?.length}&nbsp;· {post.tags.join(', ')}{/if}
			</p>
		</li>
	{/each}
</ul>
