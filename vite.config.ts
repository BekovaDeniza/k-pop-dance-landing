import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

/** Подпапка на GitHub Pages: https://<user>.github.io/<repo>/ */
function pagesBase(): string {
  const raw = process.env.GITHUB_PAGES_BASE?.trim()
  if (raw) return raw.endsWith('/') ? raw : `${raw}/`

  // В Actions имя репозитория всегда есть — подходит как base, если GITHUB_PAGES_BASE не задан
  if (process.env.GITHUB_ACTIONS === 'true') {
    const repo = process.env.GITHUB_REPOSITORY?.split('/')[1]
    if (repo) return `/${repo}/`
  }
  return '/'
}

export default defineConfig({
  plugins: [tailwindcss()],
  base: pagesBase(),
})
