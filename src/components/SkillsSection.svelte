<script>
	import ProgressCard from './ProgressCard.svelte';
	import NiceFade from './NiceFade.svelte';
	export let items;
	export let title;
</script>

<section class="mx-auto flex flex-col items-center p-4">
	<h2 class="mb-8 w-full max-w-4xl text-center text-4xl font-bold">{title}</h2>
	<div
		class="grid w-full min-w-72 max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
	>
		{#each items as item, i}
			<NiceFade delay={i * 200}>
				<ProgressCard {item} />
			</NiceFade>
		{/each}
	</div>
</section>
