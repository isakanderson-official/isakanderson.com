<script lang="ts">
	import About from '../../content/about.md';
	import Seo from '#lib/components/Seo.svelte';
</script>

<Seo title="About" />

<article class="flex flex-col gap-6">
	<h1 class="text-5xl leading-tight font-semibold tracking-[-0.02em]">About</h1>
	<div class="prose">
		<img
			src="/me.webp"
			alt="Isak Anderson"
			class="not-prose float-right mt-[1.25em] mb-4 ml-6 w-36 border border-border sm:w-48"
		/>
		<About />
	</div>
</article>
