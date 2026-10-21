<script lang="ts">
	import '../app.css';
	import '@fontsource-variable/newsreader';
	import '@fontsource-variable/newsreader/wght-italic.css';
	import '@fontsource/ibm-plex-mono/400.css';
	import '@fontsource/ibm-plex-mono/500.css';
	import EasterEgg from '#lib/components/EasterEgg.svelte';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import { site } from '#lib/site.ts';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="alternate" type="application/rss+xml" title={site.name} href="/rss.xml" />
	{#if site.cloudflareAnalyticsToken}
		<script
			defer
			src="https://static.cloudflareinsights.com/beacon.min.js"
			data-cf-beacon={JSON.stringify({ token: site.cloudflareAnalyticsToken })}
		></script>
	{/if}
</svelte:head>

<div class="mx-auto flex min-h-screen max-w-[680px] flex-col gap-12 px-6 pt-14 pb-16">
	<SiteHeader />
	<main class="flex flex-1 flex-col gap-12">
		{@render children()}
	</main>
	<SiteFooter />
</div>

<EasterEgg />
