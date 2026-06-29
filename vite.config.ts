import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Served from GitHub Pages at /<repo-name>/
  base: '/techops-docsite-interactive-playground/',
  plugins: [react()],
})
