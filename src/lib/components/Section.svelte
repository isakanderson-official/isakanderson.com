<script lang="ts">
	import type { Snippet } from 'svelte';

	/** A labelled row of the index: small mono label on the left, content on the right. */
	let { label, children }: { label: string; children: Snippet } = $props();
</script>

<section class="flex flex-wrap gap-x-6 gap-y-2">
	<h2 class="label flex-[1_1_120px] pt-1">{label}</h2>
	<div class="min-w-0 flex-[999_1_420px]">
		{@render children()}
	</div>
</section>
