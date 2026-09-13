import clsx, { type ClassValue } from 'clsx'
import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'

export const cx = (...classes: ClassValue[]) => clsx(classes)

/** External links open in a new tab; in-page anchors and mailto do not. */
export function linkProps(href: string) {
  return /^https?:/.test(href) ? { href, target: '_blank', rel: 'noopener noreferrer' } : { href }
}

type Variant = 'volt' | 'iris' | 'ink' | 'white' | 'ghost-light' | 'ghost-dark'

const VARIANTS: Record<Variant, string> = {
  volt: 'bg-volt text-void hover:bg-[#c4ff47] shadow-[0_14px_40px_-16px_rgba(175,255,0,0.75)]',
  iris: 'bg-iris text-white hover:bg-iris-deep shadow-[0_14px_40px_-16px_rgba(81,86,241,0.85)]',
  ink: 'bg-void text-white hover:bg-raised',
  white: 'bg-white text-void hover:bg-cream shadow-[0_14px_40px_-18px_rgba(0,0,0,0.45)]',
  'ghost-light': 'bg-white/[0.07] text-white ring-1 ring-inset ring-white/25 hover:bg-white/[0.14]',
  'ghost-dark': 'bg-transparent text-void ring-1 ring-inset ring-void/20 hover:bg-void/[0.05]',
}

const SIZES = {
  sm: 'min-h-10 px-4.5 text-sm',
  md: 'min-h-12 px-6 text-[0.95rem]',
  lg: 'min-h-14 px-7 text-base',
}

export function Button({
  href,
  children,
  variant = 'volt',
  size = 'md',
  icon,
  arrow = true,
  className,
}: {
  href: string
  children: ReactNode
  variant?: Variant
  size?: keyof typeof SIZES
  icon?: ReactNode
  arrow?: boolean
  className?: string
}) {
  return (
    <a
      {...linkProps(href)}
      className={cx(
        'group inline-flex items-center justify-center gap-2.5 rounded-full font-bold whitespace-nowrap transition-[background-color,transform,box-shadow] duration-200 active:scale-[0.97]',
        SIZES[size],
        VARIANTS[variant],
        className,
      )}
    >
      {icon}
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </a>
  )
}

const EYEBROW_TONES = {
  dark: 'bg-white/[0.06] text-white/85 ring-white/15',
  light: 'bg-white/70 text-void/75 ring-void/10',
  iris: 'bg-white/10 text-white ring-white/25',
}

const DOTS = {
  volt: 'bg-volt',
  ember: 'bg-ember',
  iris: 'bg-iris',
}

export function Eyebrow({
  children,
  tone = 'light',
  dot = 'volt',
  className,
}: {
  children: ReactNode
  tone?: keyof typeof EYEBROW_TONES
  dot?: keyof typeof DOTS
  className?: string
}) {
  return (
    <p
      className={cx(
        'inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.7rem] font-extrabold tracking-[0.2em] uppercase ring-1 ring-inset',
        EYEBROW_TONES[tone],
        className,
      )}
    >
      <span className={cx('h-1.5 w-1.5 rounded-full', DOTS[dot])} aria-hidden="true" />
      {children}
    </p>
  )
}

/** Big section headline. Sizes are shared so every section scales together. */
export const H2_CLASS =
  'text-[clamp(2.35rem,5.6vw,4.6rem)] font-extrabold leading-[0.98] tracking-[-0.035em]'

export function Steps({
  steps,
  tone,
}: {
  steps: { title: string; text: string }[]
  tone: 'dark' | 'light'
}) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <li
          key={s.title}
          className={cx(
            'relative overflow-hidden rounded-3xl p-6',
            tone === 'dark'
              ? 'bg-white/[0.04] ring-1 ring-inset ring-white/10'
              : 'bg-white ring-1 ring-inset ring-void/[0.07]',
          )}
        >
          <span
            aria-hidden="true"
            className={cx(
              'pointer-events-none absolute -top-3 right-3 font-display text-[5.5rem] leading-none font-extrabold tracking-tighter',
              tone === 'dark' ? 'text-white/[0.05]' : 'text-void/[0.05]',
            )}
          >
            {i + 1}
          </span>
          <span
            className={cx(
              'inline-grid h-8 w-8 place-items-center rounded-full font-display text-sm font-extrabold',
              tone === 'dark' ? 'bg-volt text-void' : 'bg-iris text-white',
            )}
          >
            {i + 1}
          </span>
          <h3 className="mt-4 text-[1.05rem] font-bold">{s.title}</h3>
          <p className={cx('mt-1.5 text-sm leading-relaxed', tone === 'dark' ? 'text-white/65' : 'text-mute')}>
            {s.text}
          </p>
        </li>
      ))}
    </ol>
  )
}
