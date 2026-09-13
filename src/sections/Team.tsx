import { animate, motion, useMotionValue, useReducedMotion } from 'framer-motion'
import { Hand } from 'lucide-react'
import type { CSSProperties } from 'react'
import { SOCIAL_ICON } from '../components/BrandIcons'
import { Mark } from '../components/Logo'
import { Reveal } from '../components/motion'
import { Barcode, hashString } from '../components/QrCode'
import { Button, cx, Eyebrow, H2_CLASS, linkProps } from '../components/ui'
import { SOCIALS, TEAM, type Member } from '../content'
import { teamPhotoFor } from '../lib/images'

/*
 * The team as a row of lanyard ID badges hanging off a rail. Each badge is a
 * pendulum pivoting at the top of its strap: hover nudges it, a mouse drag
 * swings it, and it settles on a loose spring. It also idles with a slow
 * sway so the row never looks frozen.
 */

const THEMES = [
  { band: 'bg-iris text-white', mark: 'text-volt', tile: 'bg-[#ECEDFE]', ink: 'text-iris', chip: 'bg-iris/10 text-iris' },
  { band: 'bg-void text-white', mark: 'text-volt', tile: 'bg-void', ink: 'text-volt', chip: 'bg-void text-volt' },
  { band: 'bg-ember text-void', mark: 'text-void', tile: 'bg-[#FFE9DE]', ink: 'text-ember', chip: 'bg-ember/12 text-[#B83B00]' },
  { band: 'bg-[#1560D6] text-white', mark: 'text-white', tile: 'bg-[#E7F0FE]', ink: 'text-[#1560D6]', chip: 'bg-[#1560D6]/10 text-[#1560D6]' },
]

// Strap lengths, so the row hangs unevenly like real lanyards do.
const STRAPS = [64, 104, 80, 120, 72]

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

function Badge({ m, index }: { m: Member; index: number }) {
  const t = THEMES[index % THEMES.length]
  const reduce = useReducedMotion()
  const rotate = useMotionValue(0)
  const photo = teamPhotoFor(m.slug)

  const swing = (velocity: number) => {
    if (reduce) return
    animate(rotate, 0, { type: 'spring', stiffness: 60, damping: 4.5, velocity })
  }

  return (
    <li
      className="flex shrink-0 snap-center flex-col items-center"
      style={{ '--sway-delay': `${-index * 0.8}s`, '--sway-duration': `${4.6 + (index % 3) * 0.7}s` } as CSSProperties}
    >
      <span aria-hidden="true" className="relative z-10 -mb-1 h-4 w-4 rounded-full border-[3px] border-[#56636b] bg-void" />
      <div className="sway">
        <motion.div
          className="flex flex-col items-center"
          style={{ rotate, transformOrigin: '50% 0%' }}
          onPan={(e, info) => {
            if ((e as PointerEvent).pointerType !== 'mouse' || reduce) return
            rotate.set(Math.max(-32, Math.min(32, info.offset.x / 5)))
          }}
          onPanEnd={(e, info) => {
            if ((e as PointerEvent).pointerType !== 'mouse') return
            swing(info.velocity.x / 8)
          }}
          onPointerEnter={(e) => {
            if (e.pointerType !== 'mouse') return
            const r = e.currentTarget.getBoundingClientRect()
            swing((e.clientX < r.left + r.width / 2 ? 1 : -1) * 55)
          }}
          onTap={() => swing(index % 2 ? 70 : -70)}
        >
          {/* strap */}
          <div aria-hidden="true" className="flex w-7 justify-center overflow-hidden bg-volt" style={{ height: STRAPS[index % STRAPS.length] }}>
            <span className="text-[8.5px] font-extrabold tracking-[0.3em] whitespace-nowrap text-void uppercase [writing-mode:vertical-rl]">
              Blorbmart · Blorbmart · Blorbmart · Blorbmart
            </span>
          </div>
          {/* clip */}
          <div aria-hidden="true" className="relative z-10 flex flex-col items-center">
            <span className="h-2.5 w-4 rounded-t-md bg-linear-to-b from-[#dfe4e7] to-[#9aa5ad]" />
            <span className="h-4 w-10 rounded-md bg-linear-to-b from-[#eef1f3] to-[#a4afb6] shadow-md ring-1 ring-black/10" />
          </div>

          <article className="relative -mt-2.5 w-[15.5rem] overflow-hidden rounded-[1.4rem] bg-white text-ink shadow-[0_34px_60px_-28px_rgba(0,0,0,0.85)] select-none lg:w-[13rem] xl:w-[13.75rem]">
            <div className={cx('relative px-4 pt-7 pb-3', t.band)}>
              <span aria-hidden="true" className="absolute top-2.5 left-1/2 h-2 w-11 -translate-x-1/2 rounded-full bg-black/25" />
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Mark className={cx('h-4 w-4', t.mark)} />
                  <span className="font-display text-[0.82rem] font-extrabold tracking-tight">Blorbmart</span>
                </span>
                <span className="text-[0.6rem] font-extrabold tracking-[0.22em] uppercase opacity-85">Team</span>
              </div>
            </div>

            <div className="p-3.5">
              <div className={cx('relative aspect-square overflow-hidden rounded-2xl', t.tile)}>
                {photo ? (
                  <img src={photo} alt={`Portrait of ${m.name}`} className="h-full w-full object-cover" draggable={false} loading="lazy" />
                ) : (
                  <>
                    <Mark className={cx('absolute -right-[16%] -bottom-[20%] h-[92%] w-auto rotate-[-12deg] opacity-[0.14]', t.ink)} />
                    <span aria-hidden="true" className={cx('absolute inset-0 grid place-items-center font-display text-[4.4rem] font-extrabold tracking-[-0.05em]', t.ink)}>
                      {initials(m.name)}
                    </span>
                  </>
                )}
              </div>

              <h3 className="mt-3.5 text-[1.12rem] leading-[1.1] font-extrabold tracking-tight">{m.name}</h3>
              <p className={cx('mt-1.5 inline-flex rounded-full px-2.5 py-1 text-[0.7rem] font-extrabold', t.chip)}>{m.role}</p>

              <div className="mt-3 flex items-end justify-between gap-2 border-t border-dashed border-ink/15 pt-3">
                <Barcode seed={hashString(m.slug)} className="h-7 w-20 text-ink/80" />
                <span className="font-mono text-[0.65rem] font-bold text-mute">BLB-{String(index + 1).padStart(3, '0')}</span>
              </div>

              <ul className="mt-3 flex gap-1.5">
                {SOCIALS.map((s) => {
                  const own = m.socials[s.key]
                  const Icon = SOCIAL_ICON[s.key]
                  return (
                    <li key={s.key}>
                      <a
                        {...linkProps(own ?? s.href)}
                        aria-label={own ? `${m.name} on ${s.label}` : `Blorbmart on ${s.label}`}
                        draggable={false}
                        className="grid h-10 w-10 place-items-center rounded-full bg-ink/[0.06] text-ink/75 transition-colors hover:bg-ink hover:text-white"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </article>
        </motion.div>
      </div>
    </li>
  )
}

function Rail({ members, offset }: { members: Member[]; offset: number }) {
  return (
    <div className="scroll-x -mx-5 snap-x snap-mandatory px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:overflow-visible lg:px-0">
      <div className="relative w-max lg:w-full">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-1 h-3 rounded-full bg-linear-to-b from-[#5b676e] to-[#1b2327] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
        />
        <ul className="relative flex gap-6 pb-12 lg:justify-between lg:gap-0">
          {members.map((m, i) => (
            <Badge key={m.slug} m={m} index={offset + i} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export function Team() {
  const rows = [TEAM.slice(0, 5), TEAM.slice(5)]

  return (
    <section id="team" aria-labelledby="team-title" className="grain section-y relative isolate overflow-hidden bg-void text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/2 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-iris/25 blur-[140px]" />
        <div className="dotfield absolute inset-0 [mask-image:linear-gradient(180deg,#000,transparent)]" />
      </div>

      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow tone="dark">The squad</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 id="team-title" className={cx(H2_CLASS, 'mt-6')}>
                The people behind <span className="text-volt">the cart.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl">
                Students, builders and campus insiders on a mission to make campus life easier — one delivery at a time.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="flex items-center gap-2 text-sm font-semibold text-white/60">
              <Hand className="h-4 w-4 text-volt" aria-hidden="true" />
              <span className="hidden lg:inline">Grab a badge and give it a swing.</span>
              <span className="lg:hidden">Swipe to meet the squad.</span>
            </p>
          </Reveal>
        </div>

        <div className="mt-16 space-y-6 lg:mt-20 lg:space-y-10">
          {rows.map((row, r) => (
            <Reveal key={r} delay={r * 0.1}>
              <Rail members={row} offset={r * 5} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-white/[0.05] p-7 ring-1 ring-white/10 ring-inset sm:flex-row sm:items-center sm:p-9">
            <div>
              <h3 className="text-[clamp(1.5rem,2.6vw,2rem)] font-extrabold tracking-tight">Want your name on a badge?</h3>
              <p className="mt-2 max-w-xl text-white/70">
                We're always looking for campus ambassadors, riders, creatives and builders who love solving real problems
                for real students.
              </p>
            </div>
            <Button href="#careers" size="lg" className="shrink-0">
              See careers
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
