/*
 * Everything on the site that is a fact rather than design: where each button
 * goes, which campuses are live, who is on the team. Edit here, not in the
 * section components.
 */

export const LINKS = {
  /*
   * Blorbmart's one domain is blorbmart.com.ng: this site on www (the bare
   * domain redirects there), and the shop, rider and vendor apps on their
   * subdomains.
   */
  /** The buyer web app (installable PWA), where every "Order" button goes. */
  webApp: 'https://shop.blorbmart.com.ng',
  /** The same address without the scheme, for places that print it. */
  webAppLabel: 'shop.blorbmart.com.ng',
  playStore: 'https://play.google.com/store/apps/details?id=ng.com.blorbmart.app',
  vendorPlayStore: 'https://play.google.com/store/apps/details?id=ng.com.blorbmart.vendor',
  vendorWeb: 'https://vendor.blorbmart.com.ng',
  riderApp: 'https://rider.blorbmart.com.ng',
  whatsapp: 'https://wa.me/2349022594853',
  email: 'blorbmarthelpdesk@gmail.com',
  /* Legal pages, served by this site from terms.html, privacy.html and delete-account.html. */
  terms: '/terms',
  privacy: '/privacy',
  deleteAccount: '/delete-account',
} as const

/*
 * The facts the legal pages rest on. The data practices they describe were
 * checked against the apps and backend on 2026-09-15, and the owner confirmed
 * the company name the same day.
 */
export const LEGAL = {
  company: 'Blorbmart Limited',
  /** Registered office. The pages print it only once it is filled in. */
  address: '' as string,
  /** CAC registration number, e.g. "RC 1234567". Printed only once filled in. */
  rc: '' as string,
  updated: '15 September 2026',
  /** Days a verified deletion request may take. */
  deletionDays: 14,
  /** Years payment and order records outlive a deleted account (CAMA 2020, s. 375). */
  recordYears: 6,
} as const

export const SOCIALS = [
  { key: 'instagram', label: 'Instagram', href: 'https://instagram.com/blorbmart' },
  { key: 'x', label: 'X', href: 'https://x.com/blorbmart' },
  { key: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@blorbmart' },
  { key: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/blorbmart' },
] as const

export type SocialKey = (typeof SOCIALS)[number]['key']

export function mailto(subject: string, body?: string) {
  const q = new URLSearchParams({ subject, ...(body ? { body } : {}) })
  return `mailto:${LINKS.email}?${q.toString().replace(/\+/g, '%20')}`
}

/** Mirrors the backend campus registry (Blorbmart-backend/services/universities.js). */
export const CAMPUSES = [
  { short: 'UNIOSUN', name: 'Osun State University', city: 'Osogbo' },
  { short: 'LAUTECH', name: 'Ladoke Akintola University of Technology', city: 'Ogbomoso' },
  { short: 'UNN', name: 'University of Nigeria', city: 'Nsukka' },
  { short: 'OOU', name: 'Olabisi Onabanjo University', city: 'Ago-Iwoye' },
] as const

/** The figure the rider app's own earnings calculator uses. */
export const RIDER_RATE = 540

export type Member = {
  /** Also the photo filename: drop `src/assets/team/<slug>.jpg` and it appears. */
  slug: string
  name: string
  role: string
  /**
   * Personal profile URLs. Any network left out links to Blorbmart's own
   * account instead, and is labelled that way for screen readers.
   */
  socials: Partial<Record<SocialKey, string>>
}

export const TEAM: Member[] = [
  { slug: 'oluwabiyi-samuel', name: 'Oluwabiyi Samuel', role: 'CEO', socials: {} },
  { slug: 'badmus-qudus', name: 'Badmus Qudus', role: 'CTO', socials: {} },
  { slug: 'olaniyan-alexander', name: 'Olaniyan Alexander', role: 'COO', socials: {} },
  { slug: 'oluwatobi-john', name: 'Oluwatobi John', role: 'CSO', socials: {} },
  { slug: 'ayomide-badmus', name: 'Ayomide Badmus', role: 'Community Lead', socials: {} },
  { slug: 'olubodun-bisola', name: 'Olubodun Bisola', role: 'Campus Head of Operations', socials: {} },
  { slug: 'oyenekwe-chisom', name: 'Oyenekwe Chisom', role: 'Campus Head of Operations', socials: {} },
  { slug: 'iyanu-olugbenga', name: 'Iyanu Olugbenga', role: 'Campus Head of Operations', socials: {} },
  { slug: 'akinyode-favour', name: 'Akinyode Favour', role: 'P.R.O', socials: {} },
  { slug: 'akinkunmi-hephzibah', name: 'Akinkunmi Hephzibah', role: 'Creative Designer', socials: {} },
]
