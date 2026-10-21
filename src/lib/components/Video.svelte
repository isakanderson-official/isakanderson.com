<script lang="ts">
	import { mediaUrl } from '#lib/content.ts';

	/**
	 * Demo video hosted on R2. `loop` (the default) plays muted and on repeat like a GIF;
	 * set `loop={false}` for a full-length video with sound and controls, e.g. inside a blog post.
	 *
	 * In Markdown: <Video src="prtytime/demo.mp4" caption="Creating an invite" />
	 */
	let {
		src,
		poster,
		caption,
		loop = true,
		label
	}: {
		src: string;
		poster?: string;
		caption?: string;
		loop?: boolean;
		/** Describes the video for screen readers. Defaults to the caption. */
		label?: string;
	} = $props();

	let reduceMotion = $state(false);

	$effect(() => {
		const query = window.matchMedia('(prefers-reduced-motion: reduce)');
		reduceMotion = query.matches;
		const update = () => (reduceMotion = query.matches);
		query.addEventListener('change', update);
		return () => query.removeEventListener('change', update);
	});
</script>

<figure class="not-prose my-8 flex flex-col gap-2">
	<video
		class="aspect-video w-full border border-border bg-muted object-cover"
		src={mediaUrl(src)}
		poster={mediaUrl(poster)}
		aria-label={label ?? caption}
		preload="metadata"
		playsinline
		muted={loop}
		{loop}
		autoplay={loop && !reduceMotion}
		controls={!loop || reduceMotion}
	></video>
	{#if caption}
		<figcaption class="meta">{caption}</figcaption>
	{/if}
</figure>
