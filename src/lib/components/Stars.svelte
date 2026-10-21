<script lang="ts">
	let { rating }: { rating: number } = $props();
</script>

<span class="font-mono text-[13px] whitespace-nowrap" role="img" aria-label="Rated {rating} of 5">
	{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
</span>
