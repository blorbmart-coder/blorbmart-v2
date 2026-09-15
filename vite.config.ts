import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const root = dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss()],
  server: { port: 5176 },
  // The server build (`vite build --ssr src/entry-server.tsx`) takes its one
  // entry from the command line; the page list below is the client's.
  build: isSsrBuild
    ? {}
    : {
        // One HTML file per page. Vite, Netlify and GitHub Pages serve /terms from
        // terms.html on their own; Vercel does with cleanUrls (see vercel.json).
        // Not terms/index.html: Vite's own servers don't map /terms to it, and
        // quietly serve the landing page instead.
        rolldownOptions: {
          input: {
            main: resolve(root, 'index.html'),
            terms: resolve(root, 'terms.html'),
            privacy: resolve(root, 'privacy.html'),
            deleteAccount: resolve(root, 'delete-account.html'),
          },
        },
      },
}))
