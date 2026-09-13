import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useId, useState } from 'react'
import { WhatsAppIcon } from '../components/BrandIcons'
import { EASE, Reveal } from '../components/motion'
import { Button, cx, Eyebrow, H2_CLASS } from '../components/ui'
import { LINKS } from '../content'

const FAQS = [
  {
    q: 'Which campuses is Blorbmart on?',
    a: "Right now: Osun State University (UNIOSUN, Osogbo), LAUTECH (Ogbomoso), University of Nigeria (UNN, Nsukka) and Olabisi Onabanjo University (OOU, Ago-Iwoye). More campuses are on the way — and bill payments already work anywhere in Nigeria.",
  },
  {
    q: 'How do I order food?',
    a: 'Open the Blorbmart app or the web app, pick a kitchen on your campus, add your meal and pay. Then track your rider live until your food reaches your door.',
  },
  {
    q: "Can I use Blorbmart if my school isn't listed?",
    a: "Yes. Choose “My university is not listed” when you sign up and you can pay for airtime, data, electricity and TV straight away. The food marketplace opens as soon as we reach your school.",
  },
  {
    q: 'Is my money safe?',
    a: 'Payments are processed securely, and every order and bill comes with a receipt you can verify with its QR code. If anything goes wrong, our support team is one WhatsApp message away.',
  },
  {
    q: 'How do I become a rider?',
    a: "Sign up on the Blorbmart Rider app — it's free and takes about two minutes. Once you're approved, go online whenever you're free and start earning, with same-day pay to your bank.",
  },
  {
    q: 'How do I sell on Blorbmart?',
    a: "Get Blorbmart Vendor on Google Play (or use it on the web), set up your store and menu, complete a quick verification, and you're ready for orders.",
  },
  {
    q: 'Can I sell tickets for my event?',
    a: 'Yes. Create your event in Blorbmart Vendor, set your ticket tiers, and scan guests in at the door with the built-in QR scanner.',
  },
]

function Row({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  const id = useId()
  return (
    <li className="border-b border-ink/10">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-6 py-6 text-left text-[1.1rem] font-bold tracking-tight sm:text-xl"
        >
          {q}
          <span
            className={cx(
              'grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors duration-300',
              open ? 'bg-iris text-white' : 'bg-white text-ink ring-1 ring-ink/10',
            )}
          >
            <Plus className={cx('h-5 w-5 transition-transform duration-300', open && 'rotate-45')} aria-hidden="true" />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-7 text-[1.02rem] leading-relaxed text-mute">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

export function Faq() {
  const [open, setOpen] = useState(0)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }

  return (
    <section id="faq" aria-labelledby="faq-title" className="on-light section-y bg-paper text-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Eyebrow dot="iris">FAQ</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="faq-title" className={cx(H2_CLASS, 'mt-6')}>
              Questions? Sorted.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-mute">
              Everything you need to know about ordering, paying, riding and selling. Still stuck? Real humans are one
              message away.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-8">
            <Button href={LINKS.whatsapp} variant="ink" size="lg" arrow={false} icon={<WhatsAppIcon className="h-5 w-5 text-volt" />}>
              Chat with us on WhatsApp
            </Button>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ul className="border-t border-ink/10">
            {FAQS.map((f, i) => (
              <Row key={f.q} q={f.q} a={f.a} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
