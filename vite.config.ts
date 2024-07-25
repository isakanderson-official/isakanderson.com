import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		watch: {
			usePolling: true // Use polling if file changes are not detected
		},
		hmr: {
			protocol: 'ws', // Ensure WebSocket protocol is used
			host: 'localhost'
		}
	}
});
