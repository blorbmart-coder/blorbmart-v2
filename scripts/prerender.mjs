/*
 * Fills each built page's empty #root with its server-rendered markup.
 *
 * Runs after `vite build` (the client) and `vite build --ssr` (the server
 * entry). Without this step every page ships as <div id="root"></div>, and
 * anything that does not run JavaScript (Bing, most AI crawlers, WhatsApp
 * and X link previews) sees a blank page.
 */
import { existsSync } from 'node:fs'
import { readFile, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = resolve('dist')
const ssr = resolve('dist-ssr')

const PAGES = [
  ['index.html', 'home'],
  ['terms.html', 'terms'],
  ['privacy.html', 'privacy'],
  ['delete-account.html', 'delete-account'],
]

const { render } = await import(pathToFileURL(resolve(ssr, 'entry-server.js')).href)

for (const [file, page] of PAGES) {
  const path = resolve(dist, file)
  const html = await readFile(path, 'utf8')
  const empty = /<div id="root"((?: data-page="[^"]*")?)><\/div>/
  if (!empty.test(html)) throw new Error(`${file}: no empty #root to fill`)

  const markup = render(page)
  // A function replacement, so a "$" in the page is never read as a pattern.
  const out = html.replace(empty, (_, attrs) => `<div id="root"${attrs}>${markup}</div>`)

  // The server build names assets the way the client build does. If the two
  // ever drift, the pre-rendered page would point at images that were never
  // deployed, so a missing one fails the build here instead.
  for (const [, asset] of markup.matchAll(/["'(](\/assets\/[^"')\s]+)/g)) {
    if (!existsSync(resolve(dist, `.${asset}`))) throw new Error(`${file}: ${asset} is not in dist`)
  }

  await writeFile(path, out)
  console.log(`prerendered ${file} (${(markup.length / 1024).toFixed(0)} KB of markup)`)
}

await rm(ssr, { recursive: true, force: true })
