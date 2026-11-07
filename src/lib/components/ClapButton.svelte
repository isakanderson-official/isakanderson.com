<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { MAX_CLAPS, type ClapState } from '#lib/claps.ts';
	import { buttonVariants } from '#lib/components/ui/button/index.ts';
	import { cn } from '#lib/utils.ts';

	let { slug }: { slug: string } = $props();

	const endpoint = $derived(`/api/claps/${slug}`);

	let claps = $state<ClapState | null>(null);
	let showTip = $state(false);
	let pending = 0;
	let flushTimer: ReturnType<typeof setTimeout> | undefined;
	let tipTimer: ReturnType<typeof setTimeout> | undefined;

	const done = $derived(claps !== null && claps.mine >= MAX_CLAPS);

	onMount(async () => {
		try {
			const res = await fetch(endpoint);
			if (res.ok) claps = await res.json();
		} catch {
			// Leave the button hidden if claps can't load.
		}
	});

	function clap() {
		if (!claps || done) return;
		if (claps.mine === 0) {
			showTip = true;
			clearTimeout(tipTimer);
			tipTimer = setTimeout(() => (showTip = false), 3000);
		}
		claps.mine += 1;
		claps.total += 1;
		pending += 1;
		clearTimeout(flushTimer);
		flushTimer = setTimeout(flush, 600);
	}

	// Rapid clicks are sent as one request.
	async function flush() {
		clearTimeout(flushTimer);
		const count = pending;
		if (!count) return;
		pending = 0;
		try {
			const res = await fetch(endpoint, {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ count }),
				keepalive: true
			});
			if (!res.ok) throw new Error(String(res.status));
			const saved: ClapState = await res.json();
			claps = { total: saved.total + pending, mine: saved.mine + pending };
		} catch {
			if (claps) claps = { total: claps.total - count, mine: claps.mine - count };
		}
	}

	onDestroy(() => {
		clearTimeout(tipTimer);
		flush();
	});
</script>

<svelte:window onpagehide={flush} />

{#if claps}
	<div class="relative inline-flex items-center gap-3">
		<button
			type="button"
			class={buttonVariants({ variant: 'outline' })}
			aria-label={done
				? `${claps.total} claps, you've clapped ${MAX_CLAPS} times`
				: 'Clap for this post'}
			aria-disabled={done}
			onclick={clap}
		>
			<span aria-hidden="true">👏</span>
			<span>{claps.total}</span>
		</button>
		{#if claps.mine > 0}
			<span class="meta">you clapped {claps.mine}/{MAX_CLAPS}</span>
		{/if}
		<span
			role="status"
			class={cn(
				'pointer-events-none absolute bottom-full left-0 mb-2 border border-border bg-background px-2 py-1 font-mono text-xs whitespace-nowrap transition-opacity',
				showTip ? 'opacity-100' : 'opacity-0'
			)}
		>
			{#if showTip}You can clap up to {MAX_CLAPS} times{/if}
		</span>
	</div>
{/if}
