/*
 * Everything on the site that is a fact rather than design: where each button
 * goes, which campuses are live, who is on the team. Edit here, not in the
 * section components.
 */

export const LINKS = {
  /** The buyer web app (installable PWA). */
  webApp: 'https://blorbmart-web.vercel.app',
  playStore: 'https://play.google.com/store/apps/details?id=ng.com.blorbmart.app',
  vendorPlayStore: 'https://play.google.com/store/apps/details?id=ng.com.blorbmart.vendor',
  vendorWeb: 'https://blorbmart-vendor.vercel.app',
  riderApp: 'https://blorbmart-rider.vercel.app',
  whatsapp: 'https://wa.me/2349022594853',
  email: 'support@blorbmart.shop',
  /*
   * Legal pages. Neither exists yet — /terms on the current site serves the
   * homepage, and the blorbmart.com/terms the apps link to does not resolve.
   * The footer shows these links only once they are filled in.
   */
  terms: '' as string,
  privacy: '' as string,
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
export const RIDER_RATE = 480

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
