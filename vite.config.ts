import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default ({ mode }: { mode: string }) => {
	const env = loadEnv(mode, process.cwd());

	// Load environment variables into process.env
	process.env = { ...process.env, ...env };

	return defineConfig({
		plugins: [react()],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
			},
		},
		//here we can define the port we wish our program to run
		server: {
			port: Number(env.VITE_PORT) || 5132,
		},
		preview: {
			port: Number(env.VITE_PORT) || 5132,
		},
	});
};
