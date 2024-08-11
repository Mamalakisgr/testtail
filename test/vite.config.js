import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  define: {
    'process.env': process.env, // Mimic process.env for compatibility
  },
  base: './', // Ensures correct path resolution in production
  resolve: {
    alias: {
     '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  server: {
    port:5173,
    proxy: {
      '/api': {
        target: process.env.VITE_BACKEND_URL || 'http://localhost:5174', // Use environment variable
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
