import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Bike, Check, Utensils } from 'lucide-react'
import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { GooglePlayIcon } from '../components/BrandIcons'
import { MARK_PATH, MARK_VIEWBOX } from '../components/Logo'
import { EASE } from '../components/motion'
import { Phone } from '../components/Phone'
import { BuyerHomeScreen } from '../components/screens'
import { Button } from '../components/ui'
import { CAMPUSES, LINKS } from '../content'
import { FOOD } from '../lib/images'

/* "What do you want to eat?" — in Pidgin, Yoruba and Igbo, the languages of
   the four campuses we are on. */
const GREETINGS = [
  { text: 'Wetin you wan chop?', lang: 'pcm' },
  { text: 'Kí lo fẹ́ jẹ?', lang: 'yo' },
  { text: 'Gịnị ka ị chọrọ iri?', lang: 'ig' },
  { text: 'What are we eating today?', lang: 'en' },
]

function Line({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.12em]">
      <motion.span
        className="block"
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.95, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export function Hero() {
  const [g, setG] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const t = window.setInterval(() => setG((i) => (i + 1) % GREETINGS.length), 2600)
    return () => window.clearInterval(t)
  }, [reduce])

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="grain relative isolate overflow-hidden bg-void pt-28 pb-20 text-white sm:pt-36 lg:pt-40 lg:pb-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-48 -left-40 h-[38rem] w-[38rem] rounded-full bg-iris/35 blur-[130px]" />
        <div className="absolute right-[-10rem] bottom-[-8rem] h-[30rem] w-[30rem] rounded-full bg-ember/20 blur-[130px]" />
        <div className="dotfield absolute inset-0 [mask-image:radial-gradient(ellipse_at_60%_40%,#000_20%,transparent_70%)]" />
      </div>

      <div className="container-x grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-8 inline-flex items-center gap-3 rounded-full bg-white/[0.06] py-1.5 pr-5 pl-1.5 ring-1 ring-white/12 ring-inset"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-volt text-void">
              <Utensils className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="sr-only">What do you want to eat?</span>
            <span aria-hidden="true" className="relative h-6 min-w-[12.5rem] overflow-hidden text-[0.95rem] font-semibold text-white/90">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={g}
                  lang={GREETINGS[g].lang}
                  className="absolute inset-0 flex items-center whitespace-nowrap"
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  {GREETINGS[g].text}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>

          <h1
            id="hero-title"
            className="text-[clamp(3.1rem,8.4vw,7rem)] leading-[0.92] font-extrabold tracking-[-0.045em]"
          >
            <Line delay={0.1}>Your campus,</Line>
            <Line delay={0.22}>
              <span className="relative inline-block text-volt">
                delivered.
                <svg viewBox="0 0 300 24" aria-hidden="true" className="absolute -bottom-[0.06em] left-0 h-[0.16em] w-full overflow-visible">
                  <motion.path
                    d="M4 16 C 70 4, 180 2, 296 12"
                    stroke="currentColor"
                    strokeWidth="7"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1, duration: 0.8, ease: EASE }}
                  />
                </svg>
              </span>
            </Line>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
            className="mt-8 max-w-xl text-[1.12rem] leading-relaxed text-white/70 sm:text-xl"
          >
            Hot meals from the best kitchens on campus, airtime and data in seconds, power and TV sorted, and tickets to
            every big night — in one app, built by students for students.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Button href={LINKS.webApp} size="lg">
              Order food now
            </Button>
            <Button
              href={LINKS.playStore}
              variant="ghost-light"
              size="lg"
              arrow={false}
              icon={<GooglePlayIcon className="h-4.5 w-4.5" />}
            >
              Get it on Google Play
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2.5 text-sm text-white/60"
          >
            <span className="flex items-center gap-2 font-semibold">
              <span className="pulse-dot h-2 w-2 rounded-full bg-volt" aria-hidden="true" />
              Live at
            </span>
            <ul className="flex flex-wrap gap-2" aria-label="Live campuses">
              {CAMPUSES.map((c) => (
                <li
                  key={c.short}
                  title={`${c.name}, ${c.city}`}
                  className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-extrabold tracking-wider text-white/85 ring-1 ring-white/10 ring-inset"
                >
                  {c.short}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <HeroVisual />
      </div>
    </section>
  )
}

function Float({ children, className, delay, bob }: { children: ReactNode; className: string; delay: number; bob: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18, delay }}
    >
      <div className="bob" style={{ '--bob-delay': bob } as CSSProperties}>
        {children}
      </div>
    </motion.div>
  )
}

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[21rem] sm:max-w-[25rem]">
      {/* The cart-handle B, drawn in, holding the phone up. */}
      <motion.div
        aria-hidden="true"
        className="absolute top-[12%] left-0 w-full text-volt sm:top-[10%] sm:-left-[10%] sm:w-[120%]"
        initial={{ opacity: 0, rotate: -12, scale: 0.92 }}
        animate={{ opacity: 1, rotate: -7, scale: 1 }}
        transition={{ duration: 1.3, ease: EASE, delay: 0.15 }}
      >
        <svg viewBox={MARK_VIEWBOX} className="h-auto w-full overflow-visible">
          <motion.path
            d={MARK_PATH}
            fill="currentColor"
            stroke="currentColor"
            strokeWidth={5}
            initial={{ pathLength: 0, fillOpacity: 0 }}
            animate={{ pathLength: 1, fillOpacity: 1 }}
            transition={{
              pathLength: { duration: 1.6, ease: 'easeInOut', delay: 0.3 },
              fillOpacity: { duration: 0.8, delay: 1.35 },
            }}
          />
        </svg>
      </motion.div>

      <motion.div
        className="relative"
        initial={{ y: 70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
      >
        <Phone
          screen="home"
          label="The Blorbmart app home screen, showing popular kitchens near your hostel."
          className="mx-auto w-[76%]"
        >
          <BuyerHomeScreen />
        </Phone>
      </motion.div>

      <Float className="absolute top-[6%] -right-[1%] z-20 sm:-right-[9%]" delay={1.2} bob="-3s">
        <div className="flex flex-col items-center">
          <div className="h-24 w-24 overflow-hidden rounded-full shadow-2xl ring-4 ring-volt sm:h-28 sm:w-28">
            <img src={FOOD.chickenJollof} alt="" className="h-full w-full object-cover" fetchPriority="high" />
          </div>
          <span className="-mt-3 rounded-full bg-white px-3 py-1.5 text-[0.72rem] font-extrabold whitespace-nowrap text-void shadow-lg">
            Jollof &amp; chicken
          </span>
        </div>
      </Float>

      <Float className="absolute bottom-[8%] -left-[4%] z-20 sm:-left-[18%]" delay={1.4} bob="-1s">
        <div className="w-[12.75rem] rounded-2xl bg-white p-3 text-void shadow-[0_24px_50px_-18px_rgba(0,0,0,0.6)] sm:w-[13.75rem]">
          <div className="flex items-center gap-2.5">
            <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-void text-volt">
              <Bike className="h-4.5 w-4.5" aria-hidden="true" />
              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-volt ring-2 ring-white" />
            </span>
            <div className="min-w-0">
              <p className="text-[0.8rem] leading-tight font-extrabold">Your rider is 4 min away</p>
              <p className="text-[0.7rem] text-mute">Mama T&apos;s Kitchen → Hall 3</p>
            </div>
          </div>
          <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-void/10">
            <motion.span
              className="block h-full w-full origin-left rounded-full bg-iris"
              initial={{ scaleX: 0.2 }}
              animate={{ scaleX: 0.78 }}
              transition={{ duration: 2.2, delay: 1.6, ease: EASE }}
            />
          </div>
        </div>
      </Float>

      <Float className="absolute -bottom-[4%] -right-[2%] z-20 sm:-right-[10%]" delay={1.6} bob="-2s">
        <div className="flex items-center gap-2.5 rounded-2xl bg-void/85 px-3.5 py-3 text-white ring-1 ring-white/15 backdrop-blur-md">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-volt text-void">
            <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
          </span>
          <div>
            <p className="text-[0.78rem] leading-tight font-extrabold">₦1,000 airtime sent</p>
            <p className="text-[0.68rem] text-white/60">MTN · just now</p>
          </div>
        </div>
      </Float>
    </div>
  )
}
