import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: [{ find: '@', replacement: path.resolve(__dirname, '/src') }],
	},
	plugins: [react(), svgr()],
	build: {
		outDir: './build',
	},
	server: {
		host: '0.0.0.0',
		port: 3000,
	},
});
