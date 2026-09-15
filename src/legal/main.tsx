import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '../index.css'
import { isLegalSlug } from './docs'
import { LegalPage } from './LegalPage'

// terms.html, privacy.html and delete-account.html all load this entry; each
// names its page on the root element.
const root = document.getElementById('root')!
const slug = root.dataset.page
if (!isLegalSlug(slug)) throw new Error(`No legal page called "${slug}"`)

const page = (
  <StrictMode>
    <LegalPage slug={slug} />
  </StrictMode>
)

// Pre-rendered by the build (scripts/prerender.mjs); empty under the dev server.
if (root.hasChildNodes()) hydrateRoot(root, page)
else createRoot(root).render(page)
