import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion'
import { useEffect, useState, type ReactNode, type RefObject } from 'react'

export const EASE = [0.22, 1, 0.36, 1] as const

/** Fades and lifts its content the first time it scrolls into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

const parent: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }
const child: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={parent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    >
      {children}
    </motion.div>
  )
}

export function Item({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={child}>
      {children}
    </motion.div>
  )
}

/**
 * A boolean that flips on its own — on for `onMs`, off for `offMs` — while
 * `ref` is on screen. Drives the looping moments inside the phone mockups
 * (a toast arriving, a payment succeeding). Paused off screen, and never
 * starts at all for people who asked for reduced motion.
 */
export function useLoop(ref: RefObject<Element | null>, onMs: number, offMs: number) {
  const inView = useInView(ref, { amount: 0.3 })
  const reduce = useReducedMotion()
  const [on, setOn] = useState(false)

  useEffect(() => {
    if (!inView || reduce) return
    const t = window.setTimeout(() => setOn((v) => !v), on ? onMs : offMs)
    return () => window.clearTimeout(t)
  }, [on, inView, reduce, onMs, offMs])

  return on
}
