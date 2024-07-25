<script lang="ts">
	import { slide } from 'svelte/transition';
	import Icon from '@iconify/svelte';
	export let item: { name: string; progress: number; description?: string; href?: string };
	const { name, progress, description, href } = item;
</script>

<div
	class="card w-full cursor-default bg-base-100 shadow-xl transition-all duration-1000 hover:scale-105 hover:shadow-2xl"
	class:cursor-pointer={href}
>
	<div class="card-body">
		<h2 class="card-title">
			{item.name}
			{#if href}
				<Icon icon="line-md:link" />
			{/if}
		</h2>
		{#if description}
			<p class="-mt-2">{description}</p>
		{/if}

		<progress class="progress progress-primary w-full" value={item.progress} max="100"></progress>
	</div>
</div>
