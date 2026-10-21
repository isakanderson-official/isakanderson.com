// Markdown files are compiled to Svelte components by mdsvex.
declare module '*.md' {
	import type { Component } from 'svelte';

	const component: Component;
	export default component;
	export const metadata: Record<string, unknown>;
}
