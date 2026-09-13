import { BadgeCheck, Bell, Bike, TrendingUp, Wallet } from 'lucide-react'
import { GooglePlayIcon } from '../components/BrandIcons'
import { Item, Reveal, Stagger } from '../components/motion'
import { Phone } from '../components/Phone'
import { VendorScreen } from '../components/screens'
import { Button, cx, Eyebrow, H2_CLASS, Steps } from '../components/ui'
import { LINKS } from '../content'
import { FOOD } from '../lib/images'

const PERKS = [
  { icon: Bell, title: 'Orders in real time', text: 'New orders ping your phone the moment they land, with everything you need to start cooking.' },
  { icon: Bike, title: 'Delivery, handled', text: 'Campus riders pick up and deliver. You stay in the kitchen.' },
  { icon: Wallet, title: 'Get paid, fast', text: 'Watch your balance grow and withdraw straight to your bank.' },
  { icon: TrendingUp, title: 'Know your numbers', text: 'Daily revenue, orders and best sellers in one clean dashboard.' },
]

const STEPS = [
  { title: 'Get Blorbmart Vendor', text: 'Free on Google Play — or run it right in your browser.' },
  { title: 'Set up your store', text: 'Add your menu, prices, photos and opening hours in minutes.' },
  { title: 'Get verified', text: 'Complete a quick KYC check and earn your verified badge.' },
  { title: 'Start selling', text: 'Go live and start receiving orders from students across campus.' },
]

export function Vendor() {
  return (
    <section id="sell" aria-labelledby="sell-title" className="on-light section-y relative overflow-hidden bg-cream text-ink">
      <div aria-hidden="true" className="dotfield-ink pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_20%_40%,#000_10%,transparent_60%)]" />
      <div className="container-x relative">
        <div className="grid items-center gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal className="relative order-2 mx-auto w-full max-w-[19rem] sm:max-w-[20.5rem] lg:order-1">
            <div aria-hidden="true" className="absolute -inset-10 rounded-full bg-iris/20 blur-3xl" />
            <Phone
              screen="vendor"
              label="The Blorbmart Vendor dashboard showing an available balance, weekly revenue and a new order notification."
              className="relative"
            >
              <VendorScreen />
            </Phone>
            <div className="bob absolute -right-[6%] bottom-[5%] w-[8.5rem] overflow-hidden rounded-2xl bg-white p-1.5 shadow-2xl sm:-right-[18%]">
              <img src={FOOD.jollofPlated} alt="" className="h-24 w-full rounded-xl object-cover" loading="lazy" />
              <p className="px-1.5 pt-2 pb-1 text-[0.72rem] leading-tight font-extrabold">
                Jollof &amp; chicken
                <span className="block font-semibold text-mute">Top seller this week</span>
              </p>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <Eyebrow dot="iris">Sell on Blorbmart</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 id="sell-title" className={cx(H2_CLASS, 'mt-6')}>
                Your kitchen. <span className="text-iris">Every hostel on campus.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-mute sm:text-xl">
                Run a buka, a shawarma spot, a campus store or a side hustle from your room? Blorbmart puts you in front of
                every student on campus. You cook, we deliver, you get paid.
              </p>
            </Reveal>

            <Stagger className="mt-10 grid gap-3 sm:grid-cols-2">
              {PERKS.map((p) => (
                <Item key={p.title} className="rounded-3xl bg-white p-5 ring-1 ring-void/[0.07] ring-inset">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-iris/10 text-iris">
                    <p.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-mute">{p.text}</p>
                </Item>
              ))}
            </Stagger>

            <Reveal className="mt-6">
              <p className="flex items-center gap-2 text-sm font-semibold text-mute">
                <BadgeCheck className="h-4.5 w-4.5 text-iris" aria-hidden="true" />
                Throwing an event? Sell tickets and scan guests in from the same app.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 sm:mt-24">
          <Reveal>
            <h3 className="text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold tracking-[-0.03em]">Open your store in four steps</h3>
          </Reveal>
          <Reveal delay={0.05} className="mt-7">
            <Steps tone="light" steps={STEPS} />
          </Reveal>
          <Reveal delay={0.1} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button
              href={LINKS.vendorPlayStore}
              variant="iris"
              size="lg"
              icon={<GooglePlayIcon className="h-4.5 w-4.5" />}
            >
              Open your store
            </Button>
            <Button href={LINKS.vendorWeb} variant="ghost-dark" size="lg">
              Use it on the web
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
