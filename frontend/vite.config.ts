// vite.config.ts
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Importa desde "@/..." en vez de rutas relativas largas
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    // Descomenta si quieres ocultar el overlay de errores en pantalla:
    // hmr: { overlay: false },
  },
  build: {
    target: 'esnext',
  },
  // No ponemos alias para animejs; el componente lo importa dinámicamente.
});
