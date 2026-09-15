import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, CalendarDays, Check, MapPin, Megaphone } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Mark } from '../components/Logo'
import { EASE, Reveal } from '../components/motion'
import { QrCode } from '../components/QrCode'
import { Button, cx, Eyebrow, H2_CLASS, linkProps } from '../components/ui'
import { LINKS } from '../content'

type TicketData = {
  id: string
  title: string
  date: string
  venue: string
  tier: string
  seed: number
  skin: string
  tierCls: string
}

const TICKETS: TicketData[] = [
  {
    id: 'freshers',
    title: "Freshers' Night",
    date: 'Sat, 18 Oct · 8PM',
    venue: 'Main Auditorium',
    tier: 'VIP',
    seed: 7,
    skin: 'bg-linear-to-br from-ember via-[#FF7A1A] to-gold text-void',
    tierCls: 'bg-void text-volt',
  },
  {
    id: 'dinner',
    title: 'Faculty Dinner & Awards',
    date: 'Fri, 7 Nov · 6PM',
    venue: 'Events Centre',
    tier: 'Table of 4',
    seed: 19,
    skin: 'bg-linear-to-br from-iris to-iris-deep text-white',
    tierCls: 'bg-white text-iris',
  },
  {
    id: 'comedy',
    title: 'Campus Comedy Live',
    date: 'Sat, 22 Nov · 7PM',
    venue: 'Student Union Hall',
    tier: 'Regular',
    seed: 42,
    skin: 'bg-raised text-white',
    tierCls: 'bg-volt text-void',
  },
]

// Resting spots in the stack, front to back. y is a % of the ticket's height.
const POS = [
  { y: '0%', rotate: -4, scale: 1 },
  { y: '17%', rotate: 3, scale: 0.94 },
  { y: '34%', rotate: -1.5, scale: 0.88 },
]

/* Sized in cqw against the stack, so a ticket is the same design at 320px or 480px wide. */
function Ticket({ t }: { t: TicketData }) {
  return (
    <div className={cx('ticket-mask relative flex aspect-[2.3/1] w-full overflow-hidden rounded-[5cqw]', t.skin)}>
      <div className="relative flex min-w-0 basis-[71%] flex-col justify-between p-[5cqw] pr-[4cqw]">
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-[1.4cqw] text-[2.4cqw] font-extrabold tracking-[0.2em] uppercase opacity-80">
            <Mark className="h-[3.4cqw] w-[3.4cqw]" />
            Blorbmart Events
          </span>
          <span className={cx('rounded-full px-[2.2cqw] py-[0.8cqw] text-[2.3cqw] font-extrabold tracking-wider uppercase', t.tierCls)}>
            {t.tier}
          </span>
        </div>
        <p className="font-display text-[6.4cqw] leading-[0.92] font-extrabold tracking-[-0.02em] uppercase">{t.title}</p>
        <div className="flex flex-wrap gap-x-[4cqw] gap-y-[1cqw] text-[2.7cqw] font-bold opacity-85">
          <span className="flex items-center gap-[1.2cqw]">
            <CalendarDays className="h-[3cqw] w-[3cqw]" aria-hidden="true" />
            {t.date}
          </span>
          <span className="flex items-center gap-[1.2cqw]">
            <MapPin className="h-[3cqw] w-[3cqw]" aria-hidden="true" />
            {t.venue}
          </span>
        </div>
      </div>
      <span aria-hidden="true" className="absolute top-[14%] bottom-[14%] left-[71%] border-l-2 border-dashed border-current opacity-30" />
      <div className="flex flex-1 flex-col items-center justify-center gap-[1.6cqw] p-[3cqw]">
        <div className="rounded-[2cqw] bg-white p-[1.4cqw]">
          <QrCode seed={t.seed} className="h-[15cqw] w-[15cqw] text-void" />
        </div>
        <span className="text-[2.1cqw] font-extrabold tracking-[0.2em] uppercase opacity-80">Admit one</span>
      </div>
    </div>
  )
}

function TicketStack() {
  const [order, setOrder] = useState([0, 1, 2])
  const [tick, setTick] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.4 })
  const reduce = useReducedMotion()

  const next = () => {
    setOrder((o) => [...o.slice(1), o[0]])
    setTick((t) => t + 1)
  }

  useEffect(() => {
    if (!inView || reduce) return
    const t = window.setTimeout(next, 3600)
    return () => window.clearTimeout(t)
  }, [inView, reduce, tick])

  return (
    <div>
      <div ref={ref} className="@container relative mx-auto w-full max-w-[34rem] pb-[17%]" aria-hidden="true">
        <div className="invisible aspect-[2.3/1]" />
        {TICKETS.map((t, i) => {
          const pos = order.indexOf(i)
          // The ticket that just left the front arcs out and tucks in at the back.
          const leaving = tick > 0 && pos === TICKETS.length - 1
          const rest = POS[pos]
          return (
            <motion.div
              key={t.id}
              onClick={next}
              className="absolute inset-x-0 top-0 cursor-pointer [filter:drop-shadow(0_28px_36px_rgba(0,0,0,0.5))]"
              style={{ zIndex: TICKETS.length - pos }}
              initial={false}
              animate={
                leaving
                  ? { x: ['0%', '62%', '0%'], y: ['0%', '-22%', rest.y], rotate: [-4, 15, rest.rotate], scale: [1, 1, rest.scale] }
                  : { x: '0%', ...rest }
              }
              transition={
                leaving ? { duration: 0.9, ease: EASE, times: [0, 0.45, 1] } : { type: 'spring', stiffness: 220, damping: 24 }
              }
            >
              <Ticket t={t} />
            </motion.div>
          )
        })}
      </div>
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={next}
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white/[0.07] px-5 text-sm font-semibold text-white/85 ring-1 ring-white/15 transition-colors ring-inset hover:bg-white/[0.12]"
        >
          Next ticket <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

const POINTS = [
  'Pick your tier — Regular, VIP or a whole table',
  'Your ticket lives in the app. No screenshots, no paper',
  'Scan in at the door in a second',
]

export function Events() {
  return (
    <section id="events" aria-labelledby="events-title" className="grain section-y relative isolate overflow-hidden bg-void text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-32 h-[32rem] w-[32rem] rounded-full bg-ember/20 blur-[130px]" />
        <div className="absolute -right-32 -bottom-40 h-[34rem] w-[34rem] rounded-full bg-iris/30 blur-[130px]" />
      </div>

      <div className="container-x grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <TicketStack />
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <Eyebrow tone="dark" dot="ember">
              Events &amp; tickets
            </Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="events-title" className={cx(H2_CLASS, 'mt-6')}>
              Your next big night is one tap away.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/70 sm:text-xl">
              Freshers' nights, faculty dinners, concerts, comedy shows — see what's happening on campus, grab your ticket
              in seconds and walk in with a QR code on your phone. No more hunting down the guy with the ticket booklet.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="mt-8 space-y-3">
              {POINTS.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[1.02rem] font-medium text-white/85">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-volt text-void">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.2} className="mt-10">
            <Button href={LINKS.webApp} size="lg">
              Find events near you
            </Button>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-12 flex flex-col gap-4 rounded-3xl bg-white/[0.05] p-6 ring-1 ring-white/10 ring-inset sm:flex-row sm:items-center">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-ember text-void">
                <Megaphone className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="flex-1">
                <h3 className="text-lg font-bold">Hosting something?</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/70">
                  Create your event in Blorbmart Vendor, set your ticket tiers, watch sales roll in and scan guests in at
                  the gate — all from your phone.
                </p>
              </div>
              <a
                {...linkProps(LINKS.vendorWeb)}
                className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-sm font-bold text-volt hover:underline"
              >
                Sell tickets <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
