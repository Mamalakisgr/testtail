import { fileURLToPath, URL } from 'node:url'
import path from 'path';
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
  outDir: path.resolve(__dirname, 'testbackend/public'),
  server: {

    proxy: {
      '/api': {
        target: 'https://main--dapper-beijinho-216f7a.netlify.app', // Use environment variable
        changeOrigin: true,
      }
    }
  }
})
