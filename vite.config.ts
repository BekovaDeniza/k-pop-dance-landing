import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
  // На GitHub Pages проект живёт в подпапке: /<repo>/
  base: process.env.GITHUB_PAGES_BASE ?? '/',
})
