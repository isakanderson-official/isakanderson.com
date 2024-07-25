<script lang="ts">
	import { slide } from 'svelte/transition';
	export let item: { name: string; progress: number; description?: string };
	const { name, progress, description } = item;
</script>

<div
	class="card w-full cursor-default bg-base-100 shadow-xl transition-all duration-1000 hover:scale-105 hover:shadow-2xl"
	in:slide
>
	<div class="card-body">
		<h2 class="card-title">{item.name}</h2>
		{#if description}
			<p class="-mt-2">{description}</p>
		{/if}

		<progress class="progress progress-primary w-full" value={item.progress} max="100"></progress>
	</div>
</div>
