import { motion, useSpring, useTransform } from 'framer-motion'
import { Banknote, Clock, Sparkles, UserPlus } from 'lucide-react'
import { useEffect, useId, useState, type CSSProperties } from 'react'
import { WhatsAppIcon } from '../components/BrandIcons'
import { Reveal } from '../components/motion'
import { Phone } from '../components/Phone'
import { RiderScreen } from '../components/screens'
import { Button, cx, Eyebrow, H2_CLASS, Steps } from '../components/ui'
import { LINKS, RIDER_RATE } from '../content'

const naira = (v: number) => `₦${Math.round(v).toLocaleString('en-NG')}`

function Slider({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  onChange: (v: number) => void
}) {
  const id = useId()
  const fill = ((value - min) / (max - min)) * 100
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-semibold text-white/85">
          {label}
        </label>
        <span className="tnum rounded-full bg-white/10 px-3 py-1 text-sm font-bold">{value}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range mt-2"
        style={{ '--fill': `${fill}%` } as CSSProperties}
      />
    </div>
  )
}

function Earnings() {
  const [perDay, setPerDay] = useState(5)
  const [days, setDays] = useState(4)
  const weekly = perDay * days * RIDER_RATE
  const spring = useSpring(weekly, { stiffness: 140, damping: 22 })
  const shown = useTransform(spring, naira)

  useEffect(() => {
    spring.set(weekly)
  }, [spring, weekly])

  return (
    <div className="rounded-3xl bg-white/[0.05] p-6 ring-1 ring-white/10 ring-inset sm:p-7">
      <p className="flex items-center gap-2 text-[0.7rem] font-extrabold tracking-[0.2em] text-volt uppercase">
        <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
        Do the maths
      </p>
      <Slider label="Deliveries a day" value={perDay} min={1} max={20} onChange={setPerDay} />
      <Slider label="Days a week" value={days} min={1} max={7} onChange={setDays} />
      <div className="mt-6 flex flex-wrap items-end justify-between gap-2 border-t border-white/10 pt-5">
        <div>
          <p className="text-sm text-white/60">That's about</p>
          <p className="aura-volt tnum font-display text-[clamp(2.6rem,6vw,3.75rem)] leading-none font-extrabold tracking-tight text-volt">
            <motion.span aria-hidden="true">{shown}</motion.span>
            <span className="sr-only" aria-live="polite">
              {naira(weekly)}
            </span>
          </p>
        </div>
        <p className="pb-1 text-sm font-semibold text-white/70">a week</p>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-white/50">
        Based on ₦{RIDER_RATE} average per delivery. What you actually make depends on distance, demand and how often you
        go online.
      </p>
    </div>
  )
}

const PERKS = [
  { icon: Clock, label: 'Your hours' },
  { icon: Banknote, label: 'Same-day pay' },
  { icon: UserPlus, label: 'Free to join' },
]

const STEPS = [
  { title: 'Sign up in two minutes', text: 'Your name, phone number and campus. No interview, no uniform, no fee.' },
  { title: 'Get approved', text: "We verify every rider, so customers always know who's at the door." },
  { title: 'Go online between lectures', text: 'Flip the switch when you’re free. Nearby jobs ping your phone.' },
  { title: 'Get paid the same day', text: 'Your earnings go straight to your bank. No waiting for month end.' },
]

export function Rider() {
  return (
    <section id="ride" aria-labelledby="ride-title" className="section-y bg-paper">
      <div className="container-x">
        <div className="grain relative isolate overflow-hidden rounded-[2.5rem] bg-void px-6 py-14 text-white sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-32 -right-24 h-[26rem] w-[26rem] rounded-full bg-volt/15 blur-[120px]" />
            <div className="absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-ember/20 blur-[120px]" />
            <div className="dotfield absolute inset-0 [mask-image:linear-gradient(180deg,#000,transparent_80%)]" />
          </div>

          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <Reveal>
                <Eyebrow tone="dark">Ride with Blorbmart</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 id="ride-title" className={cx(H2_CLASS, 'mt-6')}>
                  Your free periods are worth <span className="text-volt">real money.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/70">
                  Deliver Blorbmart orders around your campus between lectures. No shifts, no interview, no uniform — go
                  online when you're free and get paid the same day, straight to your bank.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <ul className="mt-7 flex flex-wrap gap-2">
                  {PERKS.map((p) => (
                    <li key={p.label} className="flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-2 text-sm font-semibold ring-1 ring-white/10 ring-inset">
                      <p.icon className="h-4 w-4 text-volt" aria-hidden="true" />
                      {p.label}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.2} className="mt-10">
                <Earnings />
              </Reveal>
            </div>

            <Reveal className="relative mx-auto w-full max-w-[19rem] sm:max-w-[20.5rem]">
              <Phone screen="rider" label="The Blorbmart Rider app, online and receiving a new delivery job worth ₦480.">
                <RiderScreen />
              </Phone>
            </Reveal>
          </div>

          <div className="mt-16">
            <Reveal>
              <h3 className="text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold tracking-[-0.03em]">How to start riding</h3>
            </Reveal>
            <Reveal delay={0.05} className="mt-7">
              <Steps tone="dark" steps={STEPS} />
            </Reveal>
            <Reveal delay={0.1} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={LINKS.riderApp} size="lg">
                Start earning
              </Button>
              <Button
                href={LINKS.whatsapp}
                variant="ghost-light"
                size="lg"
                arrow={false}
                icon={<WhatsAppIcon className="h-4.5 w-4.5" />}
              >
                Questions? Chat with us
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
