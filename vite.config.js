import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // CRITICAL for Capacitor Android APK:
  // Ensures all asset URLs resolve relatively (e.g. ./assets/...) inside the Android WebView.
  base: './',
  server: {
    host: true,
    port: 5173,
    open: false,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
