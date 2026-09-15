import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type Plugin, type PreviewServer, type ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const root = dirname(fileURLToPath(import.meta.url))

/**
 * /careers/<role-id> is the careers page with one role open.
 *
 * Vite serves a URL from the file that matches it, so without this a role's
 * own link 404s under `vite dev` and `vite preview`. In production the same
 * rewrite lives in vercel.json.
 */
function careersDeepLinks(): Plugin {
  const rewrite = (server: ViteDevServer | PreviewServer) => {
    server.middlewares.use((req, _res, next) => {
      if (req.url && /^\/careers\/[^/?#]+/.test(req.url)) req.url = '/careers.html'
      next()
    })
  }
  return { name: 'blorbmart:careers-deep-links', configureServer: rewrite, configurePreviewServer: rewrite }
}

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss(), careersDeepLinks()],
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
            careers: resolve(root, 'careers.html'),
            terms: resolve(root, 'terms.html'),
            privacy: resolve(root, 'privacy.html'),
            deleteAccount: resolve(root, 'delete-account.html'),
          },
        },
      },
}))
