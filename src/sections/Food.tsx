import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Bike, Flame, Navigation, Receipt } from 'lucide-react'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { WhatsAppIcon } from '../components/BrandIcons'
import { Mark } from '../components/Logo'
import { EASE, Reveal } from '../components/motion'
import { Phone } from '../components/Phone'
import { TrackingScreen } from '../components/screens'
import { Button, cx, Eyebrow, H2_CLASS, Steps } from '../components/ui'
import { LINKS } from '../content'
import { FOOD } from '../lib/images'

const MENU = [
  {
    id: 'rice',
    name: 'Jollof & Rice',
    img: FOOD.jollofSpread,
    alt: 'Jollof rice served with grilled fish and skewers',
    blurb: 'Smoky party jollof, fried rice and ofada with stew — exactly how Sunday tastes, on a Tuesday.',
    tags: ['Party jollof', 'Fried rice', 'Ofada'],
  },
  {
    id: 'soups',
    name: 'Soups & Swallow',
    img: FOOD.egusi,
    alt: 'A bowl of egusi soup with assorted meat',
    blurb: 'Egusi, efo riro, okra and ogbono with pounded yam, eba or amala. Home cooking, minus the cooking.',
    tags: ['Egusi', 'Efo riro', 'Pounded yam'],
  },
  {
    id: 'shawarma',
    name: 'Shawarma & Wraps',
    img: FOOD.shawarma,
    alt: 'Two loaded chicken shawarma wraps',
    blurb: 'Loaded, double-sausage, extra-creamy. The late-night craving, answered.',
    tags: ['Chicken', 'Beef', 'Double sausage'],
  },
  {
    id: 'grills',
    name: 'Grills & Suya',
    img: FOOD.jollofSkewers,
    alt: 'Grilled chicken skewers over jollof rice',
    blurb: 'Skewers, grilled chicken and peppered fish, straight off the fire and still sizzling.',
    tags: ['Suya', 'Grilled chicken', 'Peppered fish'],
  },
  {
    id: 'chops',
    name: 'Small Chops',
    img: FOOD.puffPuff,
    alt: 'Golden puff-puff on a plate',
    blurb: 'Puff-puff, samosa and spring rolls for study groups, birthdays and “just because”.',
    tags: ['Puff-puff', 'Samosa', 'Spring rolls'],
  },
  {
    id: 'drinks',
    name: 'Drinks',
    img: FOOD.zobo,
    alt: 'A chilled glass of zobo with limes',
    blurb: 'Chilled zobo, chapman, smoothies and soft drinks to wash it all down.',
    tags: ['Zobo', 'Chapman', 'Smoothies'],
  },
]

const STEPS = [
  { title: 'Pick a kitchen', text: 'Browse the bukas, grills and shawarma spots on your campus — menus and prices up front.' },
  { title: 'Build your order', text: "Add what you're craving, leave a note for the kitchen and choose where it's going." },
  { title: 'Pay in seconds', text: 'Card, bank transfer or your Blorbmart wallet. No cash, no change wahala.' },
  { title: 'Track it to your door', text: 'Watch your order go from kitchen to rider to your hostel, live.' },
]

const PERKS = [
  { icon: Navigation, title: 'Live order tracking', text: 'Kitchen confirmed, food cooking, rider on the way — you see every step as it happens.' },
  { icon: Bike, title: 'Riders who know campus', text: 'Student riders who know every hall, gate and shortcut on your campus.' },
  { icon: Receipt, title: 'Receipts you can verify', text: 'Every order comes with a QR receipt, so what you paid is never up for debate.' },
  { icon: WhatsAppIcon, title: 'Help that actually replies', text: 'Real humans on WhatsApp if anything goes sideways.' },
]

const DWELL = 5200

export function Food() {
  const [active, setActive] = useState(0)
  const [pinned, setPinned] = useState(false)
  const [hover, setHover] = useState(false)
  const boardRef = useRef<HTMLDivElement>(null)
  const inView = useInView(boardRef, { amount: 0.35 })
  const reduce = useReducedMotion()
  const auto = !pinned && !hover && !reduce && inView

  useEffect(() => {
    if (!auto) return
    const t = window.setTimeout(() => setActive((a) => (a + 1) % MENU.length), DWELL)
    return () => window.clearTimeout(t)
  }, [auto, active])

  const select = (i: number) => {
    setActive(i)
    setPinned(true)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]
    if (!step) return
    e.preventDefault()
    const next = (active + step + MENU.length) % MENU.length
    select(next)
    document.getElementById(`food-tab-${MENU[next].id}`)?.focus()
  }

  const item = MENU[active]

  return (
    <section id="food" aria-labelledby="food-title" className="on-light section-y relative overflow-x-clip bg-paper text-ink">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow dot="ember">Blorbmart Food</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 id="food-title" className={cx(H2_CLASS, 'mt-6')}>
                Skip the queue.
                <br />
                Keep the{' '}
                <span className="relative inline-block text-ember">
                  jollof.
                  <svg viewBox="0 0 200 20" aria-hidden="true" className="absolute -bottom-[0.1em] left-0 h-[0.18em] w-full">
                    <path d="M2 12 Q 25 2 50 12 T 100 12 T 150 12 T 198 12" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-mute sm:text-xl">
                From mama-put favourites to late-night shawarma, order from the kitchens students actually love — and
                watch your rider bring it to your hostel, live.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="shrink-0">
            <Button href={LINKS.webApp} variant="ink" size="lg">
              Order food now
            </Button>
          </Reveal>
        </div>

        {/* The menu board */}
        <div
          ref={boardRef}
          className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <Reveal className="lg:order-2 lg:col-span-5">
            <div
              role="tablist"
              aria-label="What's on the menu"
              onKeyDown={onKeyDown}
              className="scroll-x -mx-5 flex gap-2 px-5 pb-1 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:px-0"
            >
              {MENU.map((m, i) => {
                const on = i === active
                return (
                  <button
                    key={m.id}
                    id={`food-tab-${m.id}`}
                    role="tab"
                    type="button"
                    aria-selected={on}
                    aria-controls="food-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => select(i)}
                    className={cx(
                      'group relative flex shrink-0 items-center gap-4 overflow-hidden rounded-full px-5 py-3 text-left transition-colors duration-300 lg:rounded-3xl lg:px-6 lg:py-[1.15rem]',
                      on
                        ? 'bg-void text-white lg:bg-white lg:text-ink lg:shadow-[0_22px_44px_-26px_rgba(10,15,18,0.4)]'
                        : 'bg-white/70 text-ink/65 hover:text-ink lg:bg-transparent lg:hover:bg-white/60',
                    )}
                  >
                    <span className="hidden font-display text-sm font-extrabold text-ember lg:inline">0{i + 1}</span>
                    <span className="text-[0.95rem] font-bold whitespace-nowrap lg:font-display lg:text-[1.7rem] lg:font-extrabold lg:tracking-tight">
                      {m.name}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className={cx(
                        'ml-auto hidden h-5 w-5 transition lg:block',
                        on ? 'text-ember opacity-100' : 'opacity-0 group-hover:opacity-60',
                      )}
                    />
                    {on && auto && (
                      <motion.span
                        key={`progress-${active}`}
                        aria-hidden="true"
                        className="absolute bottom-0 left-0 h-[3px] w-full origin-left bg-ember"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: DWELL / 1000, ease: 'linear' }}
                      />
                    )}
                  </button>
                )
              })}
            </div>
            <p className="mt-5 hidden px-6 text-sm text-mute lg:block">
              A taste of what's cooking. The full menus — and what's open right now — live in the app.
            </p>
          </Reveal>

          <Reveal className="lg:order-1 lg:col-span-7">
            <div
              id="food-panel"
              role="tabpanel"
              aria-labelledby={`food-tab-${item.id}`}
              className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-void sm:aspect-[16/11] lg:aspect-auto lg:h-full lg:min-h-[35rem]"
            >
              <AnimatePresence initial={false}>
                <motion.img
                  key={item.id}
                  src={item.img}
                  alt={item.alt}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: EASE }}
                  loading="lazy"
                  decoding="async"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent" />

              <div className="absolute top-5 left-5 flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-2 text-[0.75rem] font-extrabold text-void backdrop-blur">
                <Flame className="h-4 w-4 text-ember" aria-hidden="true" />
                Campus favourite
              </div>
              <span className="absolute top-5 right-5 grid h-11 w-11 place-items-center rounded-full bg-void" aria-hidden="true">
                <Mark className="h-5 w-5 text-volt" />
              </span>

              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-9">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    <h3 className="text-[clamp(2rem,4.6vw,3.4rem)] leading-none font-extrabold tracking-tight">{item.name}</h3>
                    <p className="mt-3 max-w-md text-[0.98rem] leading-relaxed text-white/85">{item.blurb}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {item.tags.map((t) => (
                        <li key={t} className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold backdrop-blur">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>

        {/* How it works */}
        <div className="mt-24 sm:mt-28">
          <Reveal>
            <h3 className="text-[clamp(1.8rem,3.6vw,2.75rem)] font-extrabold tracking-[-0.03em]">Hungry to happy in four taps.</h3>
          </Reveal>
          <Reveal delay={0.05} className="mt-8">
            <Steps tone="light" steps={STEPS} />
          </Reveal>
        </div>

        {/* Live tracking */}
        <div className="mt-24 grid items-center gap-14 sm:mt-32 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative mx-auto w-full max-w-[20rem] sm:max-w-[21.5rem]">
            <div aria-hidden="true" className="absolute -inset-12 rounded-full bg-ember/15 blur-3xl" />
            <Phone
              screen="food"
              label="Live order tracking in the Blorbmart app: the rider's route from the kitchen to your hostel, with an arrival time."
              className="relative"
            >
              <TrackingScreen />
            </Phone>
          </Reveal>
          <div>
            <Reveal>
              <Eyebrow dot="iris">Live tracking</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h3 className="mt-6 text-[clamp(2.1rem,4.4vw,3.6rem)] leading-[1] font-extrabold tracking-[-0.035em]">
                Watch your food find you.
              </h3>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-mute">
                No more “I’m at the gate” guessing games. See your order move from the kitchen to your door, every step
                of the way.
              </p>
            </Reveal>
            <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {PERKS.map((p, i) => (
                <li key={p.title}>
                  <Reveal delay={0.05 * i}>
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-void text-volt">
                      <p.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h4 className="mt-4 text-lg font-bold">{p.title}</h4>
                    <p className="mt-1.5 text-[0.95rem] leading-relaxed text-mute">{p.text}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
