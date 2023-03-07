import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import { compression } from 'vite-plugin-compression2'

const config: UserConfig = {
	plugins: [
		sveltekit(),
		wasm(),
		topLevelAwait(),
		compression({
			"algorithm": "brotliCompress",
		})
	]
};

export default config;
