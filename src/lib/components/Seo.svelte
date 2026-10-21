<script lang="ts">
	import { page } from '$app/state';
	import { site } from '#lib/site.ts';

	let { title, description = site.description }: { title?: string; description?: string } =
		$props();

	const fullTitle = $derived(title ? `${title} · ${site.name}` : `${site.name}: ${site.tagline}`);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={new URL(page.url.pathname, site.url).href} />
	<meta property="og:type" content="website" />
	<link rel="canonical" href={new URL(page.url.pathname, site.url).href} />
</svelte:head>
