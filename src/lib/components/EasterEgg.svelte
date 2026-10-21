<script lang="ts">
	/*
	 * Type the Konami code (↑ ↑ ↓ ↓ ← → ← → b a) to send the site back to 1999.
	 * Type it again, or press Escape, to come back.
	 */
	const code = [
		'ArrowUp',
		'ArrowUp',
		'ArrowDown',
		'ArrowDown',
		'ArrowLeft',
		'ArrowRight',
		'ArrowLeft',
		'ArrowRight',
		'b',
		'a'
	];

	let progress = 0;
	let active = $state(false);
	let visitors = $state(0);

	function onkeydown(event: KeyboardEvent) {
		const target = event.target as HTMLElement | null;
		if (target?.closest('input, textarea, select, [contenteditable]')) return;

		if (event.key === 'Escape' && active) {
			active = false;
			return;
		}

		const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
		progress = key === code[progress] ? progress + 1 : key === code[0] ? 1 : 0;

		if (progress === code.length) {
			progress = 0;
			active = !active;
			visitors = 1000 + Math.floor(Math.random() * 9000);
		}
	}

	$effect(() => {
		document.documentElement.classList.toggle('y2k', active);
	});
</script>

<svelte:window {onkeydown} />

{#if active}
	<div
		class="fixed inset-x-0 bottom-0 z-50 flex flex-wrap items-center justify-center gap-4 border-t-4 border-[#c0c0c0] bg-black px-4 py-2 text-center font-mono text-sm text-[#00ff00]"
		role="status"
	>
		<span
			>★ welcome 2 my homepage ★ u r visitor #{visitors.toString().padStart(6, '0')} ★ best viewed in
			Netscape Navigator ★</span
		>
		<button
			type="button"
			class="min-h-11 border-2 [border-style:outset] border-[#c0c0c0] bg-[#c0c0c0] px-3 text-black"
			onclick={() => (active = false)}>take me back</button
		>
	</div>
{/if}
