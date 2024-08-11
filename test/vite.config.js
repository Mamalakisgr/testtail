import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:5174';
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
        target: backendUrl || 'http://localhost:5174', // Use environment variable
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
