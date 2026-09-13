import type { CSSProperties, ReactNode } from 'react'
import { Mark } from '../components/Logo'
import { cx } from '../components/ui'
import { CAMPUSES } from '../content'

const SERVICES = ['Jollof', 'Shawarma', 'Airtime', 'Data', 'Electricity', 'Cable TV', 'Event tickets', 'Small chops', 'Zobo', 'Suya']

function Sparkle() {
  return (
    <svg viewBox="0 0 24 24" className="h-[0.55em] w-[0.55em] shrink-0" aria-hidden="true">
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0z" fill="currentColor" />
    </svg>
  )
}

/** Two identical halves sliding by -50% make a seamless loop. */
function Track({ children, duration, reverse }: { children: ReactNode; duration: string; reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden">
      <div
        className={cx('marquee-track flex w-max', reverse && 'marquee-reverse')}
        style={{ '--marquee-duration': duration } as CSSProperties}
      >
        {[0, 1].map((k) => (
          <div key={k} aria-hidden={k === 1 || undefined} className="flex shrink-0 items-center">
            {children}
          </div>
        ))}
      </div>
    </div>
  )
}

export function Marquee() {
  return (
    <section aria-label="What you can get on Blorbmart, and where" className="relative overflow-hidden bg-void py-14 sm:py-20">
      <div className="relative z-10 -rotate-2 scale-x-[1.08] bg-volt py-4 text-void sm:py-5">
        <Track duration="42s">
          {SERVICES.map((s) => (
            <span
              key={s}
              className="flex items-center gap-6 pr-6 font-display text-[clamp(1.5rem,3.6vw,2.75rem)] font-extrabold tracking-tight whitespace-nowrap uppercase sm:gap-10 sm:pr-10"
            >
              {s}
              <Sparkle />
            </span>
          ))}
        </Track>
      </div>
      <div className="relative -mt-2 rotate-[1.6deg] scale-x-[1.08] bg-iris py-3.5 text-white sm:py-4">
        <Track duration="48s" reverse>
          {[...CAMPUSES.map((c) => `${c.short} · ${c.city}`), 'Your campus next'].map((s) => (
            <span
              key={s}
              className="flex items-center gap-6 pr-6 text-[clamp(0.95rem,1.8vw,1.25rem)] font-extrabold tracking-[0.14em] whitespace-nowrap uppercase sm:gap-8 sm:pr-8"
            >
              {s}
              <Mark className="h-5 w-5 shrink-0 text-volt" />
            </span>
          ))}
        </Track>
      </div>
    </section>
  )
}
