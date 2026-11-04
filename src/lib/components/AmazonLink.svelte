<script lang="ts">
	import type { Snippet } from 'svelte';
	import { amazonSearchUrl } from '#lib/content.ts';

	/**
	 * Affiliate link to an Amazon search, tagged with site.amazonTag.
	 *
	 * In Markdown: <AmazonLink q="Sigma 30mm f/1.4 Sony E">Sigma 30mm f/1.4</AmazonLink>
	 */
	let { q, children }: { q: string; children: Snippet } = $props();
</script>

<a href={amazonSearchUrl(q)} rel="sponsored">{@render children()}</a>
