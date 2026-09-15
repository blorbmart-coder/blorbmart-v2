import type { EmploymentType, Job, WorkType } from './api'

export const WORK_LABELS: Record<WorkType, string> = {
  onsite: 'Onsite',
  remote: 'Remote',
  hybrid: 'Hybrid',
}

export const EMPLOYMENT_LABELS: Record<EmploymentType, string> = {
  full_time: 'Full-time',
  part_time: 'Part-time',
  internship: 'Internship',
  contract: 'Contract',
}

const DAY = 86_400_000

export const formatDate = (value: string | null) => {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })
}

const daysBetween = (value: string) => Math.round((new Date(value).getTime() - Date.now()) / DAY)

/** "Posted today" while it is news, an actual date once it is not. */
export function postedLabel(value: string | null) {
  if (!value) return ''
  const days = -daysBetween(value)
  if (Number.isNaN(days)) return ''
  if (days <= 0) return 'Posted today'
  if (days === 1) return 'Posted yesterday'
  if (days < 14) return `Posted ${days} days ago`
  return `Posted ${formatDate(value)}`
}

/**
 * The deadline, phrased as pressure only when there is some. "Closes in 2
 * days" is the difference between applying tonight and forgetting.
 */
export function deadlineLabel(value: string | null) {
  if (!value) return ''
  const days = daysBetween(value)
  if (Number.isNaN(days)) return ''
  if (days < 0) return 'Applications have closed'
  if (days === 0) return 'Closes today'
  if (days === 1) return 'Closes tomorrow'
  if (days <= 14) return `Closes in ${days} days`
  return `Closes ${formatDate(value)}`
}

/** True while the deadline is close enough to be worth pointing out. */
export const closingSoon = (job: Job) => {
  if (!job.deadline) return false
  const days = daysBetween(job.deadline)
  return !Number.isNaN(days) && days >= 0 && days <= 7
}

/** The first couple of lines of a description, for a card. */
export function summarise(description: string, limit = 180) {
  const flat = description.replace(/\s+/g, ' ').trim()
  if (flat.length <= limit) return flat
  const cut = flat.slice(0, limit)
  const lastSpace = cut.lastIndexOf(' ')
  return `${cut.slice(0, lastSpace > 80 ? lastSpace : limit).trimEnd()}…`
}

/**
 * Google for Jobs reads this from the rendered page. Employment type and the
 * remote-work fields follow schema.org's own vocabulary, which is not ours.
 */
export function jobPostingSchema(job: Job, url: string) {
  const SCHEMA_EMPLOYMENT: Record<EmploymentType, string> = {
    full_time: 'FULL_TIME',
    part_time: 'PART_TIME',
    internship: 'INTERN',
    contract: 'CONTRACTOR',
  }

  const description = [job.description, ...(job.requirements.length ? ['', 'Requirements:', ...job.requirements] : [])]
    .join('\n')
    .trim()

  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description,
    identifier: { '@type': 'PropertyValue', name: 'Blorbmart', value: job.id },
    datePosted: job.postedAt ?? undefined,
    validThrough: job.deadline ?? undefined,
    employmentType: SCHEMA_EMPLOYMENT[job.employmentType],
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Blorbmart Limited',
      sameAs: 'https://www.blorbmart.com.ng/',
      logo: 'https://www.blorbmart.com.ng/og.png',
    },
    directApply: true,
    url,
    ...(job.workType === 'remote'
      ? {
          jobLocationType: 'TELECOMMUTE',
          applicantLocationRequirements: { '@type': 'Country', name: 'Nigeria' },
        }
      : {
          jobLocation: {
            '@type': 'Place',
            address: {
              '@type': 'PostalAddress',
              addressLocality: job.location,
              addressCountry: 'NG',
            },
          },
        }),
  }
}
