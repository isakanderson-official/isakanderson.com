<script lang="ts">
	import { audioUrl, parseRef, readUrl, searchUrl } from '#lib/devotions/plan.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const days = $derived(Object.keys(data.plan).sort());
	let selected = $state<string | null>(null);
	const current = $derived(selected ?? data.today);
	const readings = $derived(data.plan[current] ?? []);

	const toDate = (key: string) => {
		const [y, m, d] = key.split('-').map(Number);
		return new Date(y, m - 1, d);
	};
	const toKey = (d: Date) =>
		`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
	const shift = (by: number) => {
		const d = toDate(current);
		d.setDate(d.getDate() + by);
		selected = toKey(d);
	};

	const heading = $derived(
		toDate(current).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
	);
	const canPrev = $derived(days.length > 0 && current > days[0]);
	const canNext = $derived(days.length > 0 && current < days[days.length - 1]);
</script>

<svelte:head>
	<title>Daily Reading</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<section class="flex flex-col gap-3">
	<div class="flex items-center justify-between gap-4">
		<p class="label">Daily reading · NLT</p>
		<div class="flex gap-2 font-mono text-sm">
			<button
				class="h-9 w-9 border border-border disabled:opacity-30"
				aria-label="Previous day"
				disabled={!canPrev}
				onclick={() => shift(-1)}>←</button
			>
			<button
				class="h-9 w-9 border border-border disabled:opacity-30"
				aria-label="Next day"
				disabled={!canNext}
				onclick={() => shift(1)}>→</button
			>
		</div>
	</div>
	<h1 class="text-5xl leading-tight font-semibold tracking-[-0.02em]">{heading}</h1>
	{#if current !== data.today}
		<button class="meta self-start underline" onclick={() => (selected = null)}>
			back to today
		</button>
	{/if}
</section>

{#if readings.length}
	{#each readings as ref, i (ref)}
		{@const passages = parseRef(ref)}
		<section class="flex flex-col gap-4 border border-border p-5">
			<div class="flex flex-col gap-1">
				<span class="label text-muted-foreground">Reading {i + 1}</span>
				<h2 class="text-3xl font-semibold tracking-[-0.01em]">{ref}</h2>
			</div>
			{#if passages.length}
				{#each passages as p (p.usfm)}
					<div class="flex flex-col gap-2">
						{#if passages.length > 1}<span class="meta">{p.label}</span>{/if}
						<div class="flex gap-2 font-mono text-sm">
							<a
								href={readUrl(p)}
								target="_blank"
								rel="noopener"
								class="flex flex-1 items-center justify-center bg-foreground px-4 py-3 text-background no-underline visited:text-background hover:text-background"
								>Read in YouVersion</a
							>
							<a
								href={audioUrl(p)}
								target="_blank"
								rel="noopener"
								aria-label="Listen to {p.label}"
								class="flex items-center justify-center border border-border px-4 py-3 text-foreground no-underline visited:text-foreground"
								>Listen</a
							>
						</div>
					</div>
				{/each}
			{:else}
				<a href={searchUrl(ref)} target="_blank" rel="noopener" class="font-mono text-sm"
					>Find on bible.com</a
				>
			{/if}
		</section>
	{/each}
{:else}
	<p>
		No reading for this day yet. See the current plan at
		<a href={data.source}>thisishope.com/devotions</a>.
	</p>
{/if}

<p class="meta">
	Buttons open YouVersion if it's installed, or bible.com if not. Listen plays the whole chapter.
	Reading plan from <a href={data.source}>Living Hope</a>.
</p>
