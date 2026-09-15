import type { ReactNode } from 'react'
import { LINKS } from '../content'
import { DELETE_ACCOUNT } from './deleteAccount'
import { PRIVACY } from './privacy'
import { TERMS } from './terms'

export type LegalSection = { id: string; title: string; body: ReactNode }

export type LegalDoc = {
  eyebrow: string
  title: string
  summary: string
  /** Rendered above the numbered sections, outside the table of contents. */
  lead?: ReactNode
  sections: LegalSection[]
}

/** The slug is also the `data-page` on each page's root element. */
export const LEGAL_PAGES = [
  { slug: 'terms', label: 'Terms of use', href: LINKS.terms },
  { slug: 'privacy', label: 'Privacy policy', href: LINKS.privacy },
  { slug: 'delete-account', label: 'Delete your account', href: LINKS.deleteAccount },
] as const

export type LegalSlug = (typeof LEGAL_PAGES)[number]['slug']

export const DOCS: Record<LegalSlug, LegalDoc> = {
  terms: TERMS,
  privacy: PRIVACY,
  'delete-account': DELETE_ACCOUNT,
}

export const isLegalSlug = (value: string | undefined): value is LegalSlug =>
  LEGAL_PAGES.some((page) => page.slug === value)
