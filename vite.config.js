import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Dossier de sortie, peut être "build" ou "dist"
  },
  server: {
    port: 3000,
  },
});
