import { MotionConfig, motion, useScroll, useSpring } from 'framer-motion'
import { AppCta } from './sections/AppCta'
import { Bills } from './sections/Bills'
import { Events } from './sections/Events'
import { Faq } from './sections/Faq'
import { Food } from './sections/Food'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { Marquee } from './sections/Marquee'
import { Nav } from './sections/Nav'
import { Rider } from './sections/Rider'
import { Team } from './sections/Team'
import { Vendor } from './sections/Vendor'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })
  return <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-volt" style={{ scaleX }} />
}

export default function App() {
  return (
    // "user": transforms are skipped for anyone with reduced motion turned on.
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-volt focus:px-5 focus:py-3 focus:font-bold focus:text-void"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Marquee />
        <Food />
        <Bills />
        <Events />
        <Rider />
        <Vendor />
        <Team />
        <AppCta />
        <Faq />
      </main>
      <Footer />
    </MotionConfig>
  )
}
