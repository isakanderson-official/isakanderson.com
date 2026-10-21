<script lang="ts">
	import { site } from '#lib/site.ts';
	import { formatMonth } from '#lib/utils.ts';

	// Set at build time, so it reads as "last updated" whenever the site is deployed.
	const builtAt = new Date().toISOString().slice(0, 10);
</script>

<footer class="flex flex-col gap-3">
	<hr class="border-foreground" />
	<div class="meta flex flex-wrap justify-between gap-3">
		<span>
			last updated {formatMonth(builtAt)} · <a href="/rss.xml">rss</a> ·
			<a href={site.github}>github</a>
		</span>
		<span aria-hidden="true" title="psst">↑ ↑ ↓ ↓ ← → ← → b a</span>
	</div>
</footer>
