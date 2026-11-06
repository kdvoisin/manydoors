import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Relative paths so the built site works on GitHub Pages (/manydoors/) and locally.
  base: './',
  plugins: [react(), tailwindcss()],
})
