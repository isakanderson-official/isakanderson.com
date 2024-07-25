<script lang="ts">
	import { onMount } from 'svelte';
	import { sineInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	let visible = false;
	let sectionElement: any;
	export let delay = 200;

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					visible = true;
					observer.unobserve(entry.target); // Stop observing once visible
				}
			},
			{ threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
		);

		if (sectionElement) {
			observer.observe(sectionElement);
		}

		return () => {
			if (sectionElement) {
				observer.unobserve(sectionElement);
			}
		};
	});
</script>

<div bind:this={sectionElement}>
	{#if visible}
		<div in:fade={{ duration: 1000, delay, easing: sineInOut }}>
			<slot />
		</div>
	{/if}
</div>
