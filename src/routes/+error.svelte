<script lang="ts">
	import { page } from '$app/state';
	import Seo from '#lib/components/Seo.svelte';
</script>

<Seo title={String(page.status)} />

<section class="flex flex-col gap-4">
	<h1 class="text-5xl leading-tight font-semibold tracking-[-0.02em]">{page.status}</h1>
	<p>
		{page.status === 404
			? "There's nothing here. Maybe it never existed, maybe I moved it."
			: page.error?.message}
	</p>
	<p><a href="/">← back home</a></p>
</section>
