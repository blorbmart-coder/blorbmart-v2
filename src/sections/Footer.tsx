import { motion } from 'framer-motion'
import { ArrowUp, Briefcase, CircleCheck, Heart, Mail } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { SOCIAL_ICON, WhatsAppIcon } from '../components/BrandIcons'
import { Lockup, Mark, Wordmark } from '../components/Logo'
import { EASE, Reveal } from '../components/motion'
import { Button, cx, linkProps } from '../components/ui'
import { CAMPUSES, LINKS, SOCIALS, mailto } from '../content'

type Link = { label: string; href: string }

const COLUMNS: { title: string; links: Link[] }[] = [
  {
    title: 'Services',
    links: [
      { label: 'Order food', href: LINKS.webApp },
      { label: 'Bills & top-ups', href: '#bills' },
      { label: 'Event tickets', href: '#events' },
      { label: 'Track an order', href: LINKS.webApp },
    ],
  },
  {
    title: 'Earn with us',
    links: [
      { label: 'Become a rider', href: LINKS.riderApp },
      { label: 'Sell on Blorbmart', href: LINKS.vendorPlayStore },
      { label: 'Host an event', href: '#events' },
      { label: 'Campus ambassador', href: mailto('Campus ambassador application') },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Our team', href: '#team' },
      { label: 'Careers', href: '#careers' },
      { label: 'Newsletter', href: '#newsletter' },
      { label: 'Press & partnerships', href: mailto('Press & partnerships') },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Chat on WhatsApp', href: LINKS.whatsapp },
      { label: 'Email support', href: `mailto:${LINKS.email}` },
      { label: 'FAQ', href: '#faq' },
      ...(LINKS.terms ? [{ label: 'Terms of service', href: LINKS.terms }] : []),
      ...(LINKS.privacy ? [{ label: 'Privacy policy', href: LINKS.privacy }] : []),
    ],
  },
]

type State = 'idle' | 'loading' | 'done' | 'mail' | 'invalid' | 'error'

const MESSAGES: Record<Exclude<State, 'idle' | 'loading'>, string> = {
  done: "You're in. Watch your inbox for the good stuff.",
  mail: "Almost there — send the email that just opened and you're on the list.",
  invalid: "That email doesn't look right. Mind checking it?",
  error: 'Something went wrong on our side. Please try again.',
}

/*
 * The newsletter form posts to VITE_NEWSLETTER_ENDPOINT when one is set. There
 * is no newsletter endpoint on the Blorbmart backend yet, so without it the
 * form falls back to a pre-filled email to support — slower, but it never
 * pretends to have saved an address it hasn't.
 */
function Newsletter() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<State>('idle')
  const failed = state === 'invalid' || state === 'error'

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const value = email.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setState('invalid')
      return
    }
    const endpoint = import.meta.env.VITE_NEWSLETTER_ENDPOINT
    if (!endpoint) {
      window.location.href = mailto('Newsletter signup', `Please add ${value} to the Blorbmart newsletter.`)
      setState('mail')
      return
    }
    setState('loading')
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value, source: 'landing' }),
      })
      setState(res.ok ? 'done' : 'error')
    } catch {
      setState('error')
    }
  }

  return (
    <div id="newsletter" className="relative overflow-hidden rounded-[2rem] bg-surface p-7 ring-1 ring-white/[0.08] ring-inset sm:p-10">
      <Mark className="pointer-events-none absolute -right-10 -bottom-16 h-60 w-auto rotate-[-12deg] text-white/[0.04]" />
      <p className="flex items-center gap-2 text-[0.7rem] font-extrabold tracking-[0.2em] text-volt uppercase">
        <Mail className="h-3.5 w-3.5" aria-hidden="true" />
        Newsletter
      </p>
      <h2 className="mt-4 text-[clamp(1.85rem,3.2vw,2.6rem)] leading-[1.02] font-extrabold tracking-[-0.03em]">
        Cool gist only. Zero spam.
      </h2>
      <p className="mt-3 max-w-md leading-relaxed text-white/65">
        New campuses, food drops, deals and behind-the-scenes from the Blorbmart team — once in a while, never too much.
      </p>

      {state === 'done' || state === 'mail' ? (
        <p role="status" className="relative mt-7 flex items-start gap-3 rounded-2xl bg-volt/10 px-4 py-4 font-semibold text-volt ring-1 ring-volt/30">
          <CircleCheck className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          {MESSAGES[state]}
        </p>
      ) : (
        <form onSubmit={submit} noValidate className="relative mt-7">
          <label htmlFor="nl-email" className="text-sm font-semibold text-white/80">
            Your email
          </label>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row">
            <input
              id="nl-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (failed) setState('idle')
              }}
              placeholder="you@example.com"
              aria-invalid={state === 'invalid'}
              aria-describedby="nl-msg"
              className="min-h-14 min-w-0 flex-1 rounded-full bg-void px-5 text-base text-white ring-1 ring-white/15 [color-scheme:dark] placeholder:text-white/35"
            />
            <button
              type="submit"
              disabled={state === 'loading'}
              className="inline-flex min-h-14 items-center justify-center rounded-full bg-volt px-7 font-bold text-void transition-colors hover:bg-[#c4ff47] disabled:opacity-60"
            >
              {state === 'loading' ? 'Subscribing…' : 'Subscribe'}
            </button>
          </div>
          <p id="nl-msg" role={failed ? 'alert' : undefined} className={cx('mt-3 text-sm', failed ? 'text-ember-light' : 'text-white/45')}>
            {failed ? MESSAGES[state] : 'Unsubscribe any time.'}
          </p>
        </form>
      )}
    </div>
  )
}

function Careers() {
  return (
    <div id="careers" className="relative overflow-hidden rounded-[2rem] bg-volt p-7 text-void sm:p-10">
      <p className="flex items-center gap-2 text-[0.7rem] font-extrabold tracking-[0.2em] uppercase">
        <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
        Careers
      </p>
      <h2 className="mt-4 text-[clamp(1.85rem,3.2vw,2.6rem)] leading-[1.02] font-extrabold tracking-[-0.03em]">
        Build the future of campus life.
      </h2>
      <p className="mt-3 max-w-md leading-relaxed text-void/75">
        We're growing campus by campus, and we're always keen to meet people who love solving real problems for real
        students.
      </p>
      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Areas we hire in">
        {['Campus ambassadors', 'Riders', 'Content & design', 'Engineering', 'Operations'].map((r) => (
          <li key={r} className="rounded-full bg-void/[0.07] px-3.5 py-1.5 text-sm font-bold ring-1 ring-void/10">
            {r}
          </li>
        ))}
      </ul>
      <Button
        href={mailto('Careers at Blorbmart', 'Hi Blorbmart team,\n\nI would love to join you as ...\n\n(Attach your CV or portfolio.)')}
        variant="ink"
        size="lg"
        className="mt-8"
      >
        Send us your CV
      </Button>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-void pt-20 text-white sm:pt-24">
      <div className="container-x">
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <Newsletter />
          </Reveal>
          <Reveal delay={0.08}>
            <Careers />
          </Reveal>
        </div>

        <div className="mt-20 grid gap-14 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Lockup className="h-9 w-auto" />
            <p className="mt-5 max-w-sm leading-relaxed text-white/60">
              The campus super-app for food, bills and event tickets. Built by students, for students.
            </p>
            <ul className="mt-6 flex gap-2">
              {SOCIALS.map((s) => {
                const Icon = SOCIAL_ICON[s.key]
                return (
                  <li key={s.key}>
                    <a
                      {...linkProps(s.href)}
                      aria-label={`Blorbmart on ${s.label}`}
                      className="grid h-11 w-11 place-items-center rounded-full bg-white/[0.06] text-white/75 ring-1 ring-white/10 transition-colors ring-inset hover:bg-volt hover:text-void"
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </a>
                  </li>
                )
              })}
              <li>
                <a
                  {...linkProps(LINKS.whatsapp)}
                  aria-label="Chat with Blorbmart on WhatsApp"
                  className="grid h-11 w-11 place-items-center rounded-full bg-white/[0.06] text-white/75 ring-1 ring-white/10 transition-colors ring-inset hover:bg-volt hover:text-void"
                >
                  <WhatsAppIcon className="h-4.5 w-4.5" />
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="font-sans text-xs font-extrabold tracking-[0.18em] text-white/45 uppercase">{col.title}</h3>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a {...linkProps(l.href)} className="text-[0.95rem] font-medium text-white/80 transition-colors hover:text-volt">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm font-semibold text-white/50">Live on campus:</span>
          {CAMPUSES.map((c) => (
            <span key={c.short} className="rounded-full bg-white/[0.05] px-3 py-1 text-xs font-bold text-white/70 ring-1 ring-white/10 ring-inset">
              {c.short} · {c.city}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 py-7 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Blorbmart. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with <Heart className="h-4 w-4 fill-ember text-ember" aria-label="love" /> on campus in Nigeria
          </p>
          <a href="#top" className="inline-flex items-center gap-1.5 font-semibold text-white/75 hover:text-volt">
            Back to top <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div aria-hidden="true" className="container-x overflow-hidden">
        <motion.div
          initial={{ y: '45%', opacity: 0 }}
          whileInView={{ y: '18%', opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <Wordmark className="h-auto w-full text-volt" />
        </motion.div>
      </div>
    </footer>
  )
}
