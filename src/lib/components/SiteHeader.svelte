<script lang="ts">
	import { page } from '$app/state';
	import { nav, site } from '#lib/site.ts';
</script>

<header class="flex flex-wrap items-baseline justify-between gap-3 font-mono text-sm">
	<a href="/" class="font-medium text-foreground no-underline visited:text-foreground"
		>{site.domain}</a
	>
	<nav aria-label="Main" class="flex flex-wrap gap-4">
		{#each nav as item (item.href)}
			{@const current = page.url.pathname.startsWith(item.href)}
			<a
				href={item.href}
				aria-current={current ? 'page' : undefined}
				class={current ? 'text-foreground no-underline visited:text-foreground' : ''}
				>{item.label}</a
			>
		{/each}
	</nav>
</header>
