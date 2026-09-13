import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { screenshotFor } from '../lib/images'
import { cx } from './ui'

/** Every coded screen is laid out at this size, then scaled to fit. */
export const SCREEN_W = 300
export const SCREEN_H = 640

/**
 * A phone frame. It shows a real screenshot from src/assets/screens when one
 * exists for `screen`, otherwise the coded mockup passed as children.
 *
 * The coded screens are built at a fixed 300×640 and scaled with a transform,
 * so their type and spacing stay proportional at every phone size instead of
 * reflowing like a web page would.
 */
export function Phone({
  screen,
  label,
  children,
  className,
}: {
  screen: string
  label: string
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const shot = screenshotFor(screen)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const fit = () => setScale(el.getBoundingClientRect().width / SCREEN_W)
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <figure className={cx('@container relative', className)}>
      <div className="relative rounded-[15cqw] bg-[#101316] p-[3.4cqw] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.6),inset_0_0_0_1.5px_rgba(255,255,255,0.09)]">
        {/* side buttons */}
        <span aria-hidden="true" className="absolute top-[17%] -left-[0.9cqw] h-[6%] w-[1.1cqw] rounded-l bg-[#23282c]" />
        <span aria-hidden="true" className="absolute top-[25%] -left-[0.9cqw] h-[9%] w-[1.1cqw] rounded-l bg-[#23282c]" />
        <span aria-hidden="true" className="absolute top-[22%] -right-[0.9cqw] h-[12%] w-[1.1cqw] rounded-r bg-[#23282c]" />

        <div
          ref={ref}
          aria-hidden="true"
          className="relative overflow-hidden rounded-[11.6cqw] bg-white"
          style={{ aspectRatio: `${SCREEN_W} / ${SCREEN_H}` }}
        >
          {shot ? (
            <img src={shot} alt="" className="absolute inset-0 h-full w-full object-cover object-top" loading="lazy" />
          ) : (
            <div
              className="absolute top-0 left-0 origin-top-left"
              style={{ width: SCREEN_W, height: SCREEN_H, transform: `scale(${scale})` }}
            >
              {children}
            </div>
          )}
          <span className="pointer-events-none absolute top-[1.7%] left-1/2 z-40 h-[3.7%] w-[31%] -translate-x-1/2 rounded-full bg-black" />
        </div>
      </div>
      <figcaption className="sr-only">{label}</figcaption>
    </figure>
  )
}
