/*
 * The build's server entry. scripts/prerender.mjs calls render() once per
 * page and writes the markup into that page's #root, so search engines, link
 * previews and AI crawlers read the whole page without running any script,
 * and a visitor sees it before the bundle has downloaded.
 */
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import type { LegalSlug } from './legal/docs'
import { LegalPage } from './legal/LegalPage'

export type Page = 'home' | LegalSlug

export function render(page: Page): string {
  return renderToString(<StrictMode>{page === 'home' ? <App /> : <LegalPage slug={page} />}</StrictMode>)
}
