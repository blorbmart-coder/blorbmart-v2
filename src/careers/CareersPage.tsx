import { ArrowLeft, ArrowRight, ArrowUp, Briefcase, Clock, MapPin, Search, TriangleAlert } from 'lucide-react'
import { useEffect, useMemo, useState, type ComponentType, type ReactNode } from 'react'
import { WhatsAppIcon } from '../components/BrandIcons'
import { Lockup } from '../components/Logo'
import { Button, cx, Eyebrow } from '../components/ui'
import { LEGAL, LINKS } from '../content'
import { careersApi, hasClosed, type Job, type JobView } from './api'
import { ApplyForm } from './ApplyForm'
import {
  closingSoon,
  deadlineLabel,
  EMPLOYMENT_LABELS,
  jobPostingSchema,
  postedLabel,
  summarise,
  WORK_LABELS,
} from './format'

/**
 * ────────────────────────────────────────────────────────────────────────────
 * Careers (FEAT-BM-004): the open roles, one role in full, and the CV form.
 *
 * One page serving two URLs. /careers lists the roles; /careers/<role-id>
 * opens one of them — a real URL, because a job link gets shared, pasted into
 * WhatsApp and indexed, and a filter state in a query string does none of
 * that. vercel.json rewrites the deep link to this page, and the plugin in
 * vite.config.ts does the same in development.
 *
 * The roles themselves are fetched in the browser, so the markup the build
 * pre-renders is everything around them: a crawler with no JavaScript still
 * gets the page, its heading and the CV form.
 *
 * Nothing reads `window` during the first render. The server has no window to
 * read, so the route is picked up in an effect instead and the first client
 * render matches the pre-rendered markup exactly.
 * ────────────────────────────────────────────────────────────────────────────
 */

const SITE = 'https://www.blorbmart.com.ng'

type Sort = 'newest' | 'oldest' | 'title' | 'closing'

const SORTS: { value: Sort; label: string }[] = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'title', label: 'Title A–Z' },
  { value: 'closing', label: 'Closing soonest' },
]

const pathOf = (jobId: string | null) => (jobId ? `/careers/${jobId}` : '/careers')

const routeOf = (pathname: string) => {
  const match = /^\/careers\/([^/?#]+)/.exec(pathname)
  return match ? decodeURIComponent(match[1]) : null
}

const SELECT =
  'min-h-12 w-full appearance-none rounded-full bg-white bg-[length:0.7rem] bg-[right_1.1rem_center] bg-no-repeat pr-10 pl-4 font-semibold text-ink ring-1 ring-ink/[0.12] ring-inset outline-none focus-visible:ring-2 focus-visible:ring-iris'

const CHEVRON = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5 6 6.5l5-5' stroke='%2356626B' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
}

function Meta({ icon: Icon, children }: { icon?: ComponentType<{ className?: string }>; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/[0.05] px-3 py-1.5 text-sm font-bold text-ink/75">
      {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
      {children}
    </span>
  )
}

function DarkMeta({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.08] px-3.5 py-1.5 text-sm font-bold text-white/80 ring-1 ring-white/10 ring-inset">
      {children}
    </span>
  )
}

function Retry({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-5 inline-flex min-h-12 items-center rounded-full bg-void px-6 font-bold text-white transition-colors hover:bg-raised"
    >
      Try again
    </button>
  )
}

function Problem({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="rounded-[2rem] bg-white p-7 text-center ring-1 ring-ink/[0.07] ring-inset sm:p-10">
      <TriangleAlert className="mx-auto h-7 w-7 text-ember" aria-hidden="true" />
      <p className="mt-4 text-lg font-bold">We couldn't load this</p>
      <p className="mx-auto mt-2 max-w-md leading-relaxed text-mute">{message}</p>
      <Retry onClick={onRetry} />
    </div>
  )
}

function Skeleton() {
  return (
    <div className="space-y-4" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-44 animate-pulse rounded-[1.75rem] bg-white/70 ring-1 ring-ink/[0.05] ring-inset" />
      ))}
    </div>
  )
}

function JobCard({ job, onOpen }: { job: Job; onOpen: () => void }) {
  return (
    <a
      href={pathOf(job.id)}
      onClick={(event) => {
        // Cmd/ctrl/middle click still opens a new tab, like any other link.
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
        event.preventDefault()
        onOpen()
      }}
      className="group block rounded-[1.75rem] bg-white p-6 ring-1 ring-ink/[0.07] ring-inset transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-42px_rgba(10,15,18,0.55)] sm:p-7"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-[1.35rem] leading-tight font-extrabold tracking-[-0.02em]">{job.title}</h3>
          <p className="mt-1 font-semibold text-iris-deep">{job.department}</p>
        </div>
        {closingSoon(job) && (
          <span className="rounded-full bg-ember/[0.1] px-3 py-1.5 text-sm font-bold text-ember">
            {deadlineLabel(job.deadline)}
          </span>
        )}
      </div>

      <p className="mt-4 leading-relaxed text-mute">{summarise(job.description)}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        <Meta icon={MapPin}>{job.location}</Meta>
        <Meta>{WORK_LABELS[job.workType]}</Meta>
        <Meta>{EMPLOYMENT_LABELS[job.employmentType]}</Meta>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-ink/[0.07] pt-4">
        <span className="text-sm font-semibold text-mute">{postedLabel(job.postedAt)}</span>
        <span className="inline-flex items-center gap-1.5 font-bold text-iris-deep">
          View role
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </a>
  )
}

export function CareersPage() {
  const [jobId, setJobId] = useState<string | null>(null)
  const [ready, setReady] = useState(false)
  const [attempt, setAttempt] = useState(0)

  const [jobs, setJobs] = useState<Job[] | null>(null)
  const [jobsError, setJobsError] = useState<string | null>(null)

  const [role, setRole] = useState<JobView | null>(null)
  const [roleError, setRoleError] = useState<string | null>(null)

  const [query, setQuery] = useState('')
  const [department, setDepartment] = useState('all')
  const [workType, setWorkType] = useState('all')
  const [employment, setEmployment] = useState('all')
  const [sort, setSort] = useState<Sort>('newest')

  // The URL, once there is a browser to read it from.
  useEffect(() => {
    setJobId(routeOf(window.location.pathname))
    setReady(true)
    const onPopState = () => setJobId(routeOf(window.location.pathname))
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    if (!ready) return
    let alive = true
    setJobsError(null)
    careersApi.jobs().then(
      (list) => alive && setJobs(list),
      (error: unknown) => {
        if (!alive) return
        setJobs(null)
        setJobsError(error instanceof Error ? error.message : 'Could not load the open roles.')
      },
    )
    return () => {
      alive = false
    }
  }, [ready, attempt])

  useEffect(() => {
    if (!ready || !jobId) {
      setRole(null)
      setRoleError(null)
      return
    }
    let alive = true
    setRole(null)
    setRoleError(null)
    careersApi.job(jobId).then(
      (found) => alive && setRole(found),
      (error: unknown) => alive && setRoleError(error instanceof Error ? error.message : 'Could not load that role.'),
    )
    return () => {
      alive = false
    }
  }, [ready, jobId, attempt])

  // The tab's title and canonical URL follow the route, since this page
  // serves more than one.
  useEffect(() => {
    if (!ready) return
    document.title = role
      ? `${role.title} — Careers at Blorbmart`
      : 'Careers at Blorbmart — build the campus super-app'
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `${SITE}${pathOf(jobId)}`)
  }, [ready, jobId, role])

  const navigate = (next: string | null) => {
    window.history.pushState({}, '', pathOf(next))
    setJobId(next)
    window.scrollTo(0, 0)
  }

  const departments = useMemo(
    () => [...new Set((jobs ?? []).map((job) => job.department))].sort((a, b) => a.localeCompare(b)),
    [jobs],
  )

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase()
    const matches = (job: Job) =>
      (!needle ||
        [job.title, job.department, job.location, job.description].join(' ').toLowerCase().includes(needle)) &&
      (department === 'all' || job.department === department) &&
      (workType === 'all' || job.workType === workType) &&
      (employment === 'all' || job.employmentType === employment)

    const time = (value: string | null) => (value ? new Date(value).getTime() : 0)
    const sorted = (jobs ?? []).filter(matches)

    switch (sort) {
      case 'oldest':
        return sorted.sort((a, b) => time(a.postedAt) - time(b.postedAt))
      case 'title':
        return sorted.sort((a, b) => a.title.localeCompare(b.title))
      case 'closing':
        // A role with no deadline is never "closing soonest".
        return sorted.sort(
          (a, b) => (time(a.deadline) || Number.MAX_SAFE_INTEGER) - (time(b.deadline) || Number.MAX_SAFE_INTEGER),
        )
      default:
        return sorted.sort((a, b) => time(b.postedAt) - time(a.postedAt))
    }
  }, [jobs, query, department, workType, employment, sort])

  const filtered = visible.length !== (jobs?.length ?? 0)
  const openRole = role && !hasClosed(role) ? role : null
  const others = (jobs ?? []).filter((job) => job.id !== jobId).slice(0, 3)

  const clearFilters = () => {
    setQuery('')
    setDepartment('all')
    setWorkType('all')
    setEmployment('all')
    setSort('newest')
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-volt focus:px-5 focus:py-3 focus:font-bold focus:text-void"
      >
        Skip to content
      </a>

      <header id="top" className="relative overflow-hidden bg-void text-white">
        <div aria-hidden="true" className="dotfield pointer-events-none absolute inset-0 opacity-70" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 right-[-8%] h-[28rem] w-[28rem] rounded-full bg-iris/25 blur-[120px]"
        />

        <nav aria-label="Main" className="container-x relative flex items-center justify-between gap-4 py-5">
          <a href="/" className="shrink-0" aria-label="Blorbmart home">
            <Lockup className="h-7 w-auto sm:h-8" title="" />
          </a>
          <a
            href="/"
            className="inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold text-white/75 ring-1 ring-white/15 transition-colors ring-inset hover:bg-white/[0.07] hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>
              Back<span className="max-[379px]:hidden"> to Blorbmart</span>
            </span>
          </a>
        </nav>

        <div className="container-x relative pt-8 pb-14 sm:pt-14 sm:pb-20">
          {jobId ? (
            <>
              <button
                type="button"
                onClick={() => navigate(null)}
                className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white/[0.06] px-4 text-sm font-bold text-white/80 ring-1 ring-white/15 transition-colors ring-inset hover:bg-white/[0.12] hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                All open roles
              </button>

              <h1 className="mt-8 max-w-3xl text-[clamp(2.1rem,5.2vw,3.8rem)] leading-[1.02] font-extrabold tracking-[-0.035em]">
                {role ? role.title : roleError ? "We couldn't open that role" : 'Loading the role…'}
              </h1>

              {openRole && (
                <>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <DarkMeta>{openRole.department}</DarkMeta>
                    <DarkMeta>{WORK_LABELS[openRole.workType]}</DarkMeta>
                    <DarkMeta>{EMPLOYMENT_LABELS[openRole.employmentType]}</DarkMeta>
                    <DarkMeta>{openRole.location}</DarkMeta>
                  </div>
                  <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-semibold text-white/55">
                    <span>{postedLabel(openRole.postedAt)}</span>
                    {openRole.deadline && (
                      <span className={cx('inline-flex items-center gap-1.5', closingSoon(openRole) && 'text-volt')}>
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        {deadlineLabel(openRole.deadline)}
                      </span>
                    )}
                  </p>
                  <Button href="#apply" size="lg" className="mt-8">
                    Apply for this role
                  </Button>
                </>
              )}
            </>
          ) : (
            <>
              <Eyebrow tone="dark">Careers</Eyebrow>
              <h1 className="mt-5 max-w-3xl text-[clamp(2.5rem,6.4vw,4.6rem)] leading-[0.98] font-extrabold tracking-[-0.035em]">
                Build the campus super-app.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
                Blorbmart is students feeding, paying and moving other students — food from campus kitchens, bills,
                event tickets, and riders who cash out the same day. We are growing campus by campus, and the people we
                look for care about the messy details that make that work.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href="#roles" size="lg">
                  {jobs && jobs.length > 0
                    ? `See ${jobs.length} open role${jobs.length === 1 ? '' : 's'}`
                    : 'See open roles'}
                </Button>
                <Button href="#apply" variant="ghost-light" size="lg" arrow={false}>
                  Send your CV instead
                </Button>
              </div>
            </>
          )}
        </div>
      </header>

      <main id="main" tabIndex={-1} className="on-light bg-paper text-ink outline-none">
        {jobId ? (
          /* ── One role ─────────────────────────────────────────────── */
          <div className="container-x py-12 sm:py-16">
            {roleError ? (
              <div className="mx-auto max-w-2xl">
                <Problem message={roleError} onRetry={() => setAttempt((n) => n + 1)} />
                <p className="mt-6 text-center">
                  <button type="button" onClick={() => navigate(null)} className="font-bold text-iris-deep underline">
                    See all open roles
                  </button>
                </p>
              </div>
            ) : !role ? (
              <div className="mx-auto max-w-2xl">
                <Skeleton />
              </div>
            ) : hasClosed(role) ? (
              /* A link shared last week. Say what happened, and offer the
                 thing the person came to do anyway. */
              <div className="mx-auto max-w-2xl">
                <div className="rounded-[2rem] bg-white p-7 ring-1 ring-ink/[0.07] ring-inset sm:p-10">
                  <Eyebrow dot="ember">Closed</Eyebrow>
                  <h2 className="mt-4 text-[clamp(1.6rem,3vw,2.2rem)] leading-tight font-extrabold tracking-[-0.02em]">
                    This role is no longer taking applications.
                  </h2>
                  <p className="mt-3 leading-relaxed text-mute">
                    {role.title} in {role.department} has closed. Other roles may be open, and we keep every CV we are
                    sent — so it is still worth a minute.
                  </p>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Button href={pathOf(null)} size="lg">
                      See open roles
                    </Button>
                    <Button href="#apply" variant="ghost-dark" size="lg" arrow={false}>
                      Send your CV
                    </Button>
                  </div>
                </div>
                <div id="apply" className="mt-10 scroll-mt-24">
                  <ApplyForm job={null} />
                </div>
              </div>
            ) : (
              <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14">
                <article className="min-w-0 max-w-[46rem]">
                  {/* Google for Jobs reads this from the rendered page. */}
                  <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(jobPostingSchema(role, `${SITE}${pathOf(role.id)}`)),
                    }}
                  />

                  <h2 className="text-[clamp(1.4rem,2.6vw,1.8rem)] font-extrabold tracking-[-0.02em]">
                    About the role
                  </h2>
                  <div className="mt-4 text-[1.0625rem] leading-[1.75] whitespace-pre-line text-[#2a353c]">
                    {role.description}
                  </div>

                  {role.requirements.length > 0 && (
                    <>
                      <h2 className="mt-12 text-[clamp(1.4rem,2.6vw,1.8rem)] font-extrabold tracking-[-0.02em]">
                        What we are looking for
                      </h2>
                      <ul className="mt-5 space-y-3">
                        {role.requirements.map((item) => (
                          <li key={item} className="flex gap-3 text-[1.0625rem] leading-[1.7]">
                            <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-iris" />
                            <span className="text-[#2a353c]">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  <div id="apply" className="mt-14 scroll-mt-24">
                    <ApplyForm job={role} />
                  </div>
                </article>

                <aside className="lg:sticky lg:top-8 lg:self-start">
                  <div className="rounded-[1.75rem] bg-white p-6 ring-1 ring-ink/[0.07] ring-inset">
                    <p className="text-xs font-extrabold tracking-[0.18em] text-ink/45 uppercase">At a glance</p>
                    <dl className="mt-4 space-y-3 text-[0.95rem]">
                      {[
                        ['Team', role.department],
                        ['Work type', WORK_LABELS[role.workType]],
                        ['Employment', EMPLOYMENT_LABELS[role.employmentType]],
                        ['Location', role.location],
                        ['Posted', postedLabel(role.postedAt).replace(/^Posted /, '')],
                        ...(role.deadline ? [['Applications close', deadlineLabel(role.deadline)]] : []),
                      ].map(([label, value]) => (
                        <div key={label} className="flex items-baseline justify-between gap-4 border-b border-ink/[0.07] pb-3 last:border-0 last:pb-0">
                          <dt className="shrink-0 font-semibold text-mute">{label}</dt>
                          <dd className="text-right font-bold">{value}</dd>
                        </div>
                      ))}
                    </dl>
                    <Button href="#apply" className="mt-6 w-full" arrow={false}>
                      Apply now
                    </Button>
                  </div>

                  {others.length > 0 && (
                    <div className="mt-6 rounded-[1.75rem] bg-white p-6 ring-1 ring-ink/[0.07] ring-inset">
                      <p className="text-xs font-extrabold tracking-[0.18em] text-ink/45 uppercase">Other open roles</p>
                      <ul className="mt-4 space-y-3">
                        {others.map((other) => (
                          <li key={other.id}>
                            <a
                              href={pathOf(other.id)}
                              onClick={(event) => {
                                if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
                                event.preventDefault()
                                navigate(other.id)
                              }}
                              className="group flex items-baseline justify-between gap-3 border-b border-ink/[0.07] pb-3 last:border-0 last:pb-0"
                            >
                              <span className="min-w-0">
                                <span className="block font-bold">{other.title}</span>
                                <span className="block text-sm text-mute">
                                  {other.department} · {WORK_LABELS[other.workType]}
                                </span>
                              </span>
                              <ArrowRight
                                className="h-4 w-4 shrink-0 text-iris transition-transform duration-200 group-hover:translate-x-1"
                                aria-hidden="true"
                              />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </aside>
              </div>
            )}
          </div>
        ) : (
          /* ── Every open role ──────────────────────────────────────── */
          <>
            <section id="roles" className="container-x scroll-mt-20 py-12 sm:py-16">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="text-[clamp(1.85rem,3.4vw,2.6rem)] leading-tight font-extrabold tracking-[-0.03em]">
                    Open roles
                  </h2>
                  <p className="mt-2 text-mute">
                    {jobsError
                      ? 'We could not load them just now.'
                      : jobs === null
                        ? 'Loading what we are hiring for…'
                        : jobs.length === 0
                          ? 'Nothing open right now.'
                          : filtered
                            ? `${visible.length} of ${jobs.length} role${jobs.length === 1 ? '' : 's'} match`
                            : `${jobs.length} role${jobs.length === 1 ? '' : 's'} open`}
                  </p>
                </div>
                {filtered && (
                  <button type="button" onClick={clearFilters} className="font-bold text-iris-deep underline">
                    Clear filters
                  </button>
                )}
              </div>

              {/* ── Filters ──────────────────────────────────────────── */}
              {jobs !== null && jobs.length > 0 && (
                <div className="mt-7 grid gap-3 rounded-[1.75rem] bg-white p-4 ring-1 ring-ink/[0.07] ring-inset sm:grid-cols-2 lg:grid-cols-5">
                  <div className="relative sm:col-span-2 lg:col-span-1">
                    <Search
                      className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-mute"
                      aria-hidden="true"
                    />
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      type="search"
                      aria-label="Search roles"
                      placeholder="Search roles"
                      className="min-h-12 w-full rounded-full bg-white pr-4 pl-11 font-semibold text-ink ring-1 ring-ink/[0.12] ring-inset outline-none placeholder:font-medium placeholder:text-mute/70 focus-visible:ring-2 focus-visible:ring-iris"
                    />
                  </div>

                  <select
                    value={department}
                    onChange={(event) => setDepartment(event.target.value)}
                    aria-label="Filter by team"
                    className={SELECT}
                    style={CHEVRON}
                  >
                    <option value="all">Every team</option>
                    {departments.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>

                  <select
                    value={workType}
                    onChange={(event) => setWorkType(event.target.value)}
                    aria-label="Filter by work type"
                    className={SELECT}
                    style={CHEVRON}
                  >
                    <option value="all">Onsite, remote or hybrid</option>
                    {Object.entries(WORK_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>

                  <select
                    value={employment}
                    onChange={(event) => setEmployment(event.target.value)}
                    aria-label="Filter by employment type"
                    className={SELECT}
                    style={CHEVRON}
                  >
                    <option value="all">Any employment type</option>
                    {Object.entries(EMPLOYMENT_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>

                  <select
                    value={sort}
                    onChange={(event) => setSort(event.target.value as Sort)}
                    aria-label="Sort roles"
                    className={SELECT}
                    style={CHEVRON}
                  >
                    {SORTS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* ── The list ─────────────────────────────────────────── */}
              <div className="mt-6">
                {jobsError ? (
                  <Problem message={jobsError} onRetry={() => setAttempt((n) => n + 1)} />
                ) : jobs === null ? (
                  <Skeleton />
                ) : jobs.length === 0 ? (
                  <div className="rounded-[2rem] bg-white p-7 text-center ring-1 ring-ink/[0.07] ring-inset sm:p-12">
                    <Briefcase className="mx-auto h-7 w-7 text-iris" aria-hidden="true" />
                    <p className="mt-4 text-xl font-extrabold tracking-[-0.02em]">No roles open at the moment</p>
                    <p className="mx-auto mt-2 max-w-md leading-relaxed text-mute">
                      We hire in bursts as new campuses open. Send your CV and we will come back to you when something
                      fits — that is how a good number of this team started.
                    </p>
                    <Button href="#apply" size="lg" className="mt-7">
                      Send your CV
                    </Button>
                  </div>
                ) : visible.length === 0 ? (
                  <div className="rounded-[2rem] bg-white p-7 text-center ring-1 ring-ink/[0.07] ring-inset">
                    <p className="text-lg font-bold">No role matches that</p>
                    <p className="mt-2 text-mute">Try a different team or work type.</p>
                    <button type="button" onClick={clearFilters} className="mt-5 font-bold text-iris-deep underline">
                      Clear filters
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {visible.map((job) => (
                      <JobCard key={job.id} job={job} onOpen={() => navigate(job.id)} />
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* ── Nothing fits ───────────────────────────────────────── */}
            <section id="apply" className="container-x scroll-mt-20 pb-16 sm:pb-24">
              <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-start lg:gap-12">
                <div className="lg:sticky lg:top-8">
                  <Eyebrow dot="iris">No role fits?</Eyebrow>
                  <h2 className="mt-5 text-[clamp(1.85rem,3.4vw,2.6rem)] leading-[1.05] font-extrabold tracking-[-0.03em]">
                    Send your CV anyway.
                  </h2>
                  <p className="mt-4 leading-relaxed text-mute">
                    We keep every CV on file and come back to it when a role opens. Tell us what you would like to do
                    and we will match it against what is coming.
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Areas we hire in">
                    {['Campus ambassadors', 'Riders', 'Content & design', 'Engineering', 'Operations'].map((area) => (
                      <li
                        key={area}
                        className="rounded-full bg-white px-3.5 py-1.5 text-sm font-bold ring-1 ring-ink/[0.08] ring-inset"
                      >
                        {area}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-sm leading-relaxed text-mute">
                    Prefer email? Write to{' '}
                    <a className="font-semibold text-iris-deep underline" href={`mailto:${LINKS.email}`}>
                      {LINKS.email}
                    </a>
                    .
                  </p>
                </div>
                <ApplyForm job={null} />
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="bg-void text-white">
        <div className="container-x flex flex-col gap-8 py-14 md:flex-row md:items-end md:justify-between">
          <div>
            <Lockup className="h-8 w-auto" />
            <p className="mt-4 max-w-sm leading-relaxed text-white/60">
              Questions about a role, or about applying? Real people answer — usually the same day.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={`mailto:${LINKS.email}`} variant="ghost-light" arrow={false}>
              {LINKS.email}
            </Button>
            <Button href={LINKS.whatsapp} arrow={false} icon={<WhatsAppIcon className="h-4.5 w-4.5" />}>
              Chat on WhatsApp
            </Button>
          </div>
        </div>
        <div className="container-x flex flex-col gap-5 border-t border-white/10 py-7 text-sm text-white/55 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {new Date().getFullYear()} {LEGAL.company}. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              <li>
                <a href={LINKS.terms} className="font-semibold text-white/75 hover:text-volt">
                  Terms of use
                </a>
              </li>
              <li>
                <a href={LINKS.privacy} className="font-semibold text-white/75 hover:text-volt">
                  Privacy policy
                </a>
              </li>
            </ul>
          </nav>
          <a href="#top" className="inline-flex items-center gap-1.5 font-semibold text-white/75 hover:text-volt">
            Back to top <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </footer>
    </>
  )
}
