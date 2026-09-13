import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { GooglePlayIcon, SOCIAL_ICON } from '../components/BrandIcons'
import { Lockup } from '../components/Logo'
import { EASE } from '../components/motion'
import { Button, cx, linkProps } from '../components/ui'
import { LINKS, SOCIALS } from '../content'

const NAV = [
  { href: '#food', label: 'Food' },
  { href: '#bills', label: 'Bills' },
  { href: '#events', label: 'Events' },
  { href: '#ride', label: 'Ride' },
  { href: '#sell', label: 'Sell' },
  { href: '#team', label: 'Team' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // The open menu owns the screen: no page scroll behind it, Escape closes it,
  // and growing the window to desktop width closes it too.
  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    const prev = root.style.overflow
    root.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const mq = window.matchMedia('(min-width: 1024px)')
    const onWide = () => mq.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onWide)
    return () => {
      root.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onWide)
    }
  }, [open])

  return (
    <>
      <header
        className={cx(
          'fixed inset-x-0 top-0 z-50 border-b transition-[padding,background-color,border-color] duration-300',
          scrolled && !open ? 'glass border-white/[0.07] py-3' : 'border-transparent py-4 sm:py-5',
        )}
      >
        <nav aria-label="Main" className="container-x flex items-center justify-between gap-6">
          <a href="#top" onClick={() => setOpen(false)} className="shrink-0" aria-label="Blorbmart, back to top">
            <Lockup className="h-7 w-auto sm:h-8" title="" />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-4 py-2 text-[0.92rem] font-semibold text-white/70 transition-colors hover:bg-white/[0.07] hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {/* Stays on phones — it's the page's main action — except the very
                narrowest, where it would crowd out the menu button. */}
            <Button href={LINKS.webApp} size="sm" className="max-[359px]:hidden">
              Order food
            </Button>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition-colors ring-inset hover:bg-white/15 lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-void px-6 pt-24 pb-10 text-white lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-iris/30 blur-[100px]" />
            <ul className="relative flex flex-col">
              {NAV.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: EASE }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-2 font-display text-[2.6rem] font-extrabold tracking-tight"
                  >
                    <span className="font-sans text-sm font-bold text-volt">0{i + 1}</span>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="relative mt-auto flex flex-col gap-3 pt-10">
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
              <ul className="mt-4 flex gap-2">
                {SOCIALS.map((s) => {
                  const Icon = SOCIAL_ICON[s.key]
                  return (
                    <li key={s.key}>
                      <a
                        {...linkProps(s.href)}
                        aria-label={`Blorbmart on ${s.label}`}
                        className="grid h-11 w-11 place-items-center rounded-full bg-white/[0.07] text-white/80 ring-1 ring-white/10 hover:text-volt"
                      >
                        <Icon className="h-4.5 w-4.5" />
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
