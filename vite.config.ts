import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: '.', // Explicitly set root to project root
  publicDir: 'public', // Public assets directory
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000
  },
  preview: {
    port: 3000
  }
})