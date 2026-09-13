import { MapPin, ShieldCheck, Smartphone, Tv, Wifi, Zap } from 'lucide-react'
import { Mark } from '../components/Logo'
import { Item, Reveal, Stagger } from '../components/motion'
import { Phone } from '../components/Phone'
import { BillsScreen } from '../components/screens'
import { Button, cx, Eyebrow, H2_CLASS } from '../components/ui'
import { LINKS } from '../content'

const BILLS = [
  { icon: Smartphone, title: 'Airtime', text: 'MTN, Airtel, Glo and 9mobile. Top up any number, any time.' },
  { icon: Wifi, title: 'Data bundles', text: 'Daily, weekly and monthly plans for when the hostel Wi-Fi gives up.' },
  { icon: Zap, title: 'Electricity', text: 'Prepaid tokens straight to your phone. Light up, even at 2am.' },
  { icon: Tv, title: 'Cable TV', text: 'Renew your TV subscription before the match starts.' },
]

export function Bills() {
  return (
    <section id="bills" aria-labelledby="bills-title" className="section-y relative isolate overflow-hidden bg-iris text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="dotfield absolute inset-0 opacity-70" />
        <div className="absolute top-1/3 -left-40 h-[30rem] w-[30rem] rounded-full bg-[#7B7FFF]/50 blur-[120px]" />
        <Mark className="absolute -right-[12%] -bottom-[20%] h-[85%] w-auto rotate-[-14deg] text-white/[0.07]" />
      </div>

      <div className="container-x grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div>
          <Reveal>
            <Eyebrow tone="iris">Bills &amp; top-ups</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="bills-title" className={cx(H2_CLASS, 'mt-6')}>
              Recharge without leaving your bed.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/90 sm:text-xl">
              Airtime, data, electricity and TV — paid in seconds, with a receipt for every naira. No more trekking to
              the kiosk at the school gate.
            </p>
          </Reveal>

          <Stagger className="mt-10 grid gap-3 sm:grid-cols-2">
            {BILLS.map((b) => (
              <Item key={b.title} className="rounded-3xl bg-white/[0.09] p-5 ring-1 ring-white/15 transition-colors ring-inset hover:bg-white/[0.14]">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-volt text-void">
                  <b.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-bold">{b.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/90">{b.text}</p>
              </Item>
            ))}
          </Stagger>

          <Reveal className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
            <Button href={LINKS.webApp} variant="white" size="lg">
              Pay a bill now
            </Button>
            <p className="flex max-w-xs items-start gap-2 text-sm leading-relaxed text-white/90">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-volt" aria-hidden="true" />
              School not on Blorbmart yet? Bills still work anywhere in Nigeria.
            </p>
          </Reveal>
        </div>

        <Reveal className="relative mx-auto w-full max-w-[20rem] sm:max-w-[21.5rem]">
          <Phone
            screen="bills"
            label="Buying airtime in the Blorbmart app, followed by a verified receipt with a QR code."
          >
            <BillsScreen />
          </Phone>
          <div className="bob absolute top-[5%] -left-[32%] hidden items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 text-void shadow-2xl sm:flex">
            <ShieldCheck className="h-5 w-5 text-[#0FA968]" aria-hidden="true" />
            <span className="text-[0.78rem] leading-tight font-extrabold">
              Every receipt
              <br />
              <span className="font-semibold text-mute">QR-verified</span>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
