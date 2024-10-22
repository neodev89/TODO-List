import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import tsconfigPaths from 'vite-tsconfig-paths'
import sass from 'sass' // Importa Dart Sass

export default defineConfig({
  plugins: [
    react(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass, // Usa la nuova API di Dart Sass
      },
    },
  },
  server: {
    fs: {
      strict: true,
    },
    proxy: {
      '/api': '/api/data', // Proxy API requests to the Express server
    },
  },
  resolve: {
    alias: [
      // Aggiungi eventuali alias di percorso se necessario
    ],
  },
})
