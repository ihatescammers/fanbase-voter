import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dns from 'dns';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

dns.setDefaultResultOrder('verbatim');

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA()
	],
	server: {
		host: 'localhost',
		port: 3000
	}
});
