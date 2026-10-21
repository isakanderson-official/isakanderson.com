<script lang="ts">
	import { coverUrl, type Book } from '#lib/books.ts';

	let { book }: { book: Book } = $props();

	let failed = $state(false);
	const src = $derived(coverUrl(book));
</script>

<div class="aspect-[2/3] w-14 flex-none overflow-hidden border border-border bg-muted">
	{#if src && !failed}
		<img
			{src}
			alt=""
			loading="lazy"
			class="h-full w-full object-cover"
			onerror={() => (failed = true)}
		/>
	{/if}
</div>
