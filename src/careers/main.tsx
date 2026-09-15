import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '../index.css'
import { CareersPage } from './CareersPage'

// careers.html loads this entry. The list of roles is fetched in the browser,
// so the markup the build pre-renders is the page around it.
const root = document.getElementById('root')!

const page = (
  <StrictMode>
    <CareersPage />
  </StrictMode>
)

// Pre-rendered by the build (scripts/prerender.mjs); empty under the dev server.
if (root.hasChildNodes()) hydrateRoot(root, page)
else createRoot(root).render(page)
