import { motion } from 'framer-motion'
import { Smartphone } from 'lucide-react'
import { GooglePlayIcon } from '../components/BrandIcons'
import { MARK_PATH, MARK_VIEWBOX } from '../components/Logo'
import { Reveal } from '../components/motion'
import { Button, H2_CLASS, cx } from '../components/ui'
import { LINKS } from '../content'

export function AppCta() {
  return (
    <section aria-labelledby="app-title" className="relative isolate overflow-hidden bg-iris text-white">
      <div aria-hidden="true" className="dotfield pointer-events-none absolute inset-0 -z-10 opacity-60" />
      <div className="container-x grid items-center gap-12 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:py-28">
        <div aria-hidden="true" className="relative mx-auto w-[min(62vw,19rem)] lg:w-full lg:max-w-[25rem]">
          <div className="absolute inset-[12%] rounded-full bg-volt/30 blur-[80px]" />
          <svg viewBox={MARK_VIEWBOX} className="relative w-full overflow-visible">
            <motion.path
              d={MARK_PATH}
              fill="#fff"
              stroke="#fff"
              strokeWidth={5}
              initial={{ pathLength: 0, fillOpacity: 0 }}
              whileInView={{ pathLength: 1, fillOpacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ pathLength: { duration: 1.8, ease: 'easeInOut' }, fillOpacity: { delay: 1.3, duration: 0.7 } }}
            />
          </svg>
        </div>

        <div className="text-center lg:text-left">
          <Reveal>
            <h2 id="app-title" className={cx(H2_CLASS, 'text-[clamp(2.6rem,6.4vw,5.4rem)]')}>
              One app.
              <br />
              The whole campus.
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-white/90 sm:text-xl lg:mx-0">
              Food, bills, tickets and everything in between. Download Blorbmart and find out what your campus has been
              hiding.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Button href={LINKS.playStore} variant="white" size="lg" arrow={false} icon={<GooglePlayIcon className="h-5 w-5" />}>
              Get it on Google Play
            </Button>
            <Button href={LINKS.webApp} variant="ghost-light" size="lg">
              Open the web app
            </Button>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mx-auto mt-6 flex max-w-md items-start justify-center gap-2 text-sm leading-relaxed text-white/90 lg:mx-0 lg:justify-start">
              <Smartphone className="mt-0.5 h-4 w-4 shrink-0 text-volt" aria-hidden="true" />
              On iPhone? Open the web app in Safari and tap Share → Add to Home Screen.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
