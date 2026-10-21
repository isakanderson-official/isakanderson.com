import adapter from '@sveltejs/adapter-cloudflare';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { mdsvex } from 'mdsvex';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			extensions: ['.svelte', '.md'],
			preprocess: [mdsvex({ extensions: ['.md'] })],
			onwarn: (warning, handler) => {
				// mdsvex still emits `<script context="module">`; nothing to fix on our side.
				if (warning.code === 'script_context_deprecated' && warning.filename?.endsWith('.md'))
					return;
				handler(warning);
			},
			adapter: adapter()
		})
	]
});
