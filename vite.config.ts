import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
	server: {
		port: 3000
	},
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			registerType: 'autoUpdate',
			includeAssets: ['logo.svg'],
			manifest: {
				name: 'Edge Sveltekit',
				short_name: 'Edge Sveltekit',
				description: 'Edge Sveltekit',
				icons: [
					{
						src: 'logo.svg',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'logo.svg',
						sizes: '512x512',
						type: 'image/png'
					},
					{
						src: 'logo.svg',
						sizes: '512/512',
						type: 'maskable'
					}
				]
			}
		})
	]
});
