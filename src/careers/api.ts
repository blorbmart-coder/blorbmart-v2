/*
 * The public careers API — Blorbmart-backend/routes/careers.js.
 *
 * Nothing here is authenticated: open roles are public, and an application
 * is a form post. The one thing worth knowing is the base URL below.
 */

const FALLBACK_API_URL = 'https://blorbmart-tr1i.onrender.com'

/**
 * Blank means unset, deliberately. A hosting dashboard holding VITE_API_URL
 * with an empty value builds to '' rather than undefined, and '' as a base
 * sends every call to the static host serving this site, which answers 404 to
 * /api/* — the rider app shipped exactly that once.
 */
const configured = (import.meta.env.VITE_API_URL as string | undefined)?.trim()
export const API_BASE = configured ? configured.replace(/[/]+$/, '') : FALLBACK_API_URL

export type WorkType = 'onsite' | 'remote' | 'hybrid'
export type EmploymentType = 'full_time' | 'part_time' | 'internship' | 'contract'

export interface Job {
  id: string
  title: string
  department: string
  workType: WorkType
  location: string
  employmentType: EmploymentType
  description: string
  requirements: string[]
  postedAt: string | null
  deadline: string | null
}

/** A role that has closed. Its URL still answers, so a shared link can say so. */
export interface ClosedJob {
  id: string
  title: string
  department: string
  open: false
}

export type JobView = (Job & { open: true }) | ClosedJob

export const hasClosed = (job: JobView): job is ClosedJob => job.open === false

export interface Application {
  jobId?: string | null
  name: string
  email: string
  phone?: string
  note?: string
  areaOfInterest?: string
  consent: true
  cv: { name: string; data: string }
  /** The honeypot. People leave it empty; form-filling bots do not. */
  website?: string
}

// The API sleeps when idle, and the first request of the day pays the wake-up.
const TIMEOUT_MS = 60_000
const GENERIC_ERROR = 'Something went wrong on our side. Please try again.'

const messageOf = (body: unknown) => {
  if (body && typeof body === 'object' && 'message' in body) {
    const message = (body as { message?: unknown }).message
    if (typeof message === 'string' && message.trim()) return message
  }
  return null
}

const dataOf = <T,>(body: unknown): T => {
  if (body && typeof body === 'object' && 'data' in body) return (body as { data: T }).data
  return body as T
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...init,
      headers: {
        Accept: 'application/json',
        ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
      },
      signal: controller.signal,
      credentials: 'omit',
    })

    const text = await res.text()
    let body: unknown = null
    try {
      body = text ? JSON.parse(text) : null
    } catch {
      // A proxy error page or a cold-start splash. The message below stands in.
    }

    if (!res.ok) throw new Error(messageOf(body) ?? GENERIC_ERROR)
    return dataOf<T>(body)
  } catch (error) {
    if (controller.signal.aborted) {
      throw new Error('That took too long — our server may be waking up. Please try again.')
    }
    if (error instanceof TypeError) {
      throw new Error('We could not reach Blorbmart. Check your connection and try again.')
    }
    throw error instanceof Error ? error : new Error(GENERIC_ERROR)
  } finally {
    window.clearTimeout(timer)
  }
}

export const careersApi = {
  jobs: () => request<{ jobs: Job[] }>('/api/careers/jobs').then((data) => data.jobs),
  job: (id: string) => request<JobView>(`/api/careers/jobs/${encodeURIComponent(id)}`),
  apply: (application: Application) =>
    request<{ id: string }>('/api/careers/applications', {
      method: 'POST',
      body: JSON.stringify(application),
    }),
}
