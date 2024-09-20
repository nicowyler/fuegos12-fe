import { defineConfig } from 'vite';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import react from '@vitejs/plugin-react';
import * as path from 'path';

export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  // Added build settings for SPA fallback
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
