<script lang="ts">
	import ProgressCardPlain from './ProgressCardPlain.svelte';
	export let item: { name: string; progress: number; description?: string; href?: string };
</script>

{#if item.href}
	<a href={item.href}>
		<ProgressCardPlain {item} />
	</a>
{:else}
	<ProgressCardPlain {item} />
{/if}
