import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';

const manifest: any = {
  registerType: 'prompt',
  includeAssests: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
  manifest: {
    name: 'Smart Yatra',
    short_name: 'smart-yatra',
    description:
      'SmartYatra is an innovative Public Transport Digitization System designed to modernize urban bus transit services.',
    icons: [
      {
        src: '/android-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'favicon',
      },
      {
        src: '/android-icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
        purpose: 'favicon',
      },
      {
        src: '/android-icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
        purpose: 'favicon',
      },
      {
        src: '/android-icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
        purpose: 'favicon',
      },
      {
        src: '/android-icon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
        purpose: 'favicon',
      },
      {
        src: '/android-icon-36x36.png',
        sizes: '36x36',
        type: 'image/png',
        purpose: 'favicon',
      },
      {
        src: '/apple-icon-180x180.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'apple touch icon',
      },
      {
        src: '/ms-icon-310x310.png',
        sizes: '310x310',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    theme_color: '#ed3a3a',
    background_color: '#ffffff',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    orientation: 'portrait',
  },
};

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd());

  // Load environment variables into process.env
  process.env = { ...process.env, ...env };

  return defineConfig({
    plugins: [react(), VitePWA(manifest)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    //here we can define the port we wish our program to run
    server: {
      port: Number(env.VITE_PORT) || 5172,
    },
    preview: {
      port: Number(env.VITE_PORT) || 5172,
    },
  });
};
