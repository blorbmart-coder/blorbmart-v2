import { ArrowLeft, ArrowUp } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { WhatsAppIcon } from '../components/BrandIcons'
import { Lockup } from '../components/Logo'
import { Button, cx, Eyebrow } from '../components/ui'
import { LEGAL, LINKS } from '../content'
import { DOCS, LEGAL_PAGES, type LegalSection, type LegalSlug } from './docs'

/**
 * The section being read, for the table of contents: the last one whose top
 * has passed a line 30% of the way down the screen. "Nearest the top" gets
 * this wrong — the previous section's tail is usually still on screen.
 */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const root = document.documentElement
      // The last sections are too short to reach the line; at the very bottom
      // of the page the last one is the one being read.
      if (window.innerHeight + window.scrollY >= root.scrollHeight - 2) {
        setActive(ids[ids.length - 1])
        return
      }
      const line = window.innerHeight * 0.3
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [ids])

  return active
}

function Contents({ sections, active }: { sections: LegalSection[]; active: string }) {
  const list = (
    <ol className="space-y-0.5">
      {sections.map((s, i) => (
        <li key={s.id}>
          <a
            href={`#${s.id}`}
            aria-current={active === s.id ? 'location' : undefined}
            className={cx(
              'flex gap-3 rounded-xl px-3 py-2 text-sm leading-snug font-medium transition-colors',
              active === s.id ? 'bg-white text-ink ring-1 ring-ink/[0.07] ring-inset' : 'text-mute hover:text-ink',
            )}
          >
            <span className={cx('tnum w-5 shrink-0', active === s.id ? 'text-iris' : 'text-ink/30')}>{i + 1}</span>
            {s.title}
          </a>
        </li>
      ))}
    </ol>
  )

  return (
    <aside className="lg:sticky lg:top-8 lg:max-h-[calc(100vh-4rem)] lg:self-start lg:overflow-y-auto">
      <details className="group rounded-2xl bg-white p-2 ring-1 ring-ink/[0.07] ring-inset lg:hidden">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between px-3 font-bold [&::-webkit-details-marker]:hidden">
          On this page
          <span aria-hidden="true" className="text-mute transition-transform group-open:rotate-180">
            ▾
          </span>
        </summary>
        <nav aria-label="On this page" className="pt-1 pb-2">
          {list}
        </nav>
      </details>
      <nav aria-label="On this page" className="hidden lg:block">
        <p className="px-3 text-xs font-extrabold tracking-[0.18em] text-ink/45 uppercase">On this page</p>
        <div className="mt-4">{list}</div>
      </nav>
    </aside>
  )
}

function PageTabs({ slug, className }: { slug: LegalSlug; className?: string }) {
  return (
    <ul className={cx('flex flex-wrap gap-2', className)}>
      {LEGAL_PAGES.map((page) => {
        const current = page.slug === slug
        return (
          <li key={page.slug}>
            <a
              href={page.href}
              aria-current={current ? 'page' : undefined}
              className={cx(
                'inline-flex min-h-10 items-center rounded-full px-4 text-sm font-bold ring-1 transition-colors ring-inset',
                current ? 'bg-volt text-void ring-volt' : 'bg-white/[0.06] text-white/75 ring-white/15 hover:bg-white/[0.12] hover:text-white',
              )}
            >
              {page.label}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export function LegalPage({ slug }: { slug: LegalSlug }) {
  const doc = DOCS[slug]
  const ids = useMemo(() => doc.sections.map((s) => s.id), [doc])
  const active = useActiveSection(ids)

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
        <div aria-hidden="true" className="pointer-events-none absolute -top-40 right-[-8%] h-[28rem] w-[28rem] rounded-full bg-iris/25 blur-[120px]" />

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
          <nav aria-label="Legal pages">
            <PageTabs slug={slug} />
          </nav>
          <Eyebrow tone="dark" className="mt-10 sm:mt-14">
            {doc.eyebrow}
          </Eyebrow>
          <h1 className="mt-5 max-w-3xl text-[clamp(2.5rem,6.4vw,4.6rem)] leading-[0.98] font-extrabold tracking-[-0.035em]">
            {doc.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">{doc.summary}</p>
          <p className="mt-6 text-sm font-semibold text-white/50">Last updated {LEGAL.updated}</p>
        </div>
      </header>

      <main id="main" tabIndex={-1} className="on-light bg-paper text-ink outline-none">
        <div className="container-x grid gap-10 py-12 sm:py-20 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
          <Contents sections={doc.sections} active={active} />

          <article className="min-w-0 max-w-[46rem]">
            {doc.lead && <div className="mb-12">{doc.lead}</div>}
            {doc.sections.map((s, i) => (
              <section
                key={s.id}
                id={s.id}
                aria-labelledby={`${s.id}-title`}
                className={cx('border-t border-ink/10 py-10', i === 0 && !doc.lead && 'border-t-0 pt-0')}
              >
                <h2
                  id={`${s.id}-title`}
                  className="flex items-baseline gap-3 text-[clamp(1.45rem,2.6vw,1.9rem)] leading-tight font-extrabold tracking-[-0.02em]"
                >
                  <span className="tnum font-sans text-sm font-bold text-iris">{String(i + 1).padStart(2, '0')}</span>
                  {s.title}
                </h2>
                <div className="legal-prose mt-5">{s.body}</div>
              </section>
            ))}
          </article>
        </div>
      </main>

      <footer className="bg-void text-white">
        <div className="container-x flex flex-col gap-8 py-14 md:flex-row md:items-end md:justify-between">
          <div>
            <Lockup className="h-8 w-auto" />
            <p className="mt-4 max-w-sm leading-relaxed text-white/60">
              Questions about this page? Real people answer — usually the same day.
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
              {LEGAL_PAGES.map((page) => (
                <li key={page.slug}>
                  <a href={page.href} className="font-semibold text-white/75 hover:text-volt">
                    {page.label}
                  </a>
                </li>
              ))}
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
