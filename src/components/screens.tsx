/*
 * The coded phone screens. Each is laid out at exactly 300×640 and scaled by
 * <Phone>, so sizes here are literal pixels on a 300px-wide phone.
 *
 * The buyer screens use the buyer app's own blue/orange palette; the vendor
 * screen uses iris like the vendor app; the rider screen is the rider app's
 * dark "night shift" look. Each mockup should look like the product it sells.
 */
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowLeft,
  Bell,
  Bike,
  Check,
  ChevronDown,
  House,
  MessageCircle,
  Package,
  Phone as PhoneIcon,
  Search,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Star,
  Ticket,
  User,
  Utensils,
  Wallet,
  Wifi,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { useRef } from 'react'
import { FOOD } from '../lib/images'
import { Mark } from './Logo'
import { useLoop } from './motion'
import { QrCode } from './QrCode'
import { cx } from './ui'

export function StatusBar({ light = false }: { light?: boolean }) {
  return (
    <div
      className={cx(
        'relative z-30 flex h-10 items-center justify-between px-6 pt-1.5 text-[11.5px] font-bold',
        light ? 'text-white' : 'text-[#0B1220]',
      )}
    >
      <span className="tnum">9:41</span>
      <span className="flex items-center gap-1.5">
        <span className="flex items-end gap-[1.5px]">
          {[4, 6, 8, 10].map((h) => (
            <span key={h} className="w-[3px] rounded-[1px] bg-current" style={{ height: h }} />
          ))}
        </span>
        <Wifi className="h-3.5 w-3.5" strokeWidth={2.6} />
        <span className="h-[11px] w-[22px] rounded-[3.5px] border-[1.5px] border-current p-[1.5px] opacity-90">
          <span className="block h-full w-[70%] rounded-[1.5px] bg-current" />
        </span>
      </span>
    </div>
  )
}

type Tab = { label: string; icon: LucideIcon }

function TabBar({ tabs, active, look }: { tabs: Tab[]; active: number; look: 'buyer' | 'vendor' | 'rider' }) {
  return (
    <div
      className={cx(
        'relative mt-auto flex h-[64px] shrink-0 items-start justify-around px-2 pt-2.5',
        look === 'rider' ? 'border-t border-white/[0.06] bg-surface' : 'border-t border-black/[0.06] bg-white',
      )}
    >
      {tabs.map((t, i) => {
        const Icon = t.icon
        const on = i === active
        if (look === 'vendor') {
          return (
            <span
              key={t.label}
              className={cx(
                'flex items-center gap-1.5 rounded-full',
                on ? 'bg-iris/10 px-3 py-2 text-iris' : 'px-1.5 py-2 text-[#8B8FA3]',
              )}
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={on ? 2.5 : 2} />
              {on && <span className="text-[11px] font-bold">{t.label}</span>}
            </span>
          )
        }
        return (
          <span
            key={t.label}
            className={cx(
              'flex flex-col items-center gap-1',
              on ? (look === 'rider' ? 'text-volt' : 'text-app-blue') : look === 'rider' ? 'text-fog/60' : 'text-[#9AA6BC]',
            )}
          >
            <Icon className="h-[19px] w-[19px]" strokeWidth={on ? 2.5 : 2} />
            <span className="text-[9.5px] font-bold">{t.label}</span>
          </span>
        )
      })}
      <span
        className={cx(
          'absolute bottom-1.5 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full',
          look === 'rider' ? 'bg-white/70' : 'bg-black/80',
        )}
      />
    </div>
  )
}

const BUYER_TABS: Tab[] = [
  { label: 'Home', icon: House },
  { label: 'Search', icon: Search },
  { label: 'Orders', icon: ShoppingBag },
  { label: 'Wallet', icon: Wallet },
  { label: 'Account', icon: User },
]

/* ── Buyer: home ─────────────────────────────────────────────────────────── */

export function BuyerHomeScreen() {
  const services = [
    { label: 'Food', icon: Utensils, cls: 'bg-[#FFEDE6] text-app-orange' },
    { label: 'Airtime', icon: Smartphone, cls: 'bg-[#E7F0FE] text-app-blue' },
    { label: 'Bills', icon: Zap, cls: 'bg-[#FFF6E5] text-[#E08600]' },
    { label: 'Events', icon: Ticket, cls: 'bg-[#EFEAFE] text-[#6D4AE8]' },
  ]
  const kitchens = [
    { name: "Mama T's Kitchen", img: FOOD.jollofSkewers, rating: '4.8', eta: '20–30 min' },
    { name: 'Shawarma Spot', img: FOOD.shawarma, rating: '4.7', eta: '15–25 min' },
  ]

  return (
    <div className="flex h-full flex-col bg-app-canvas text-[#0B1220]">
      <StatusBar />
      <div className="px-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold text-app-muted">Deliver to</p>
            <p className="flex items-center gap-1 text-[13px] font-extrabold">
              Hall 3, UNIOSUN <ChevronDown className="h-3.5 w-3.5 text-app-blue" />
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative grid h-9 w-9 place-items-center rounded-full bg-white shadow-sm ring-1 ring-black/5">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2.5 h-1.5 w-1.5 rounded-full bg-app-orange" />
            </span>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-app-blue">
              <Mark className="h-4.5 w-4.5 text-white" />
            </span>
          </div>
        </div>

        <p className="mt-4 font-display text-[21px] leading-tight font-extrabold tracking-tight">Good afternoon, Tolu</p>
        <p className="text-[11.5px] text-app-muted">What are you craving today?</p>

        <div className="mt-3 flex h-10 items-center gap-2 rounded-2xl bg-white px-3 text-[11px] text-app-muted shadow-sm ring-1 ring-black/5">
          <Search className="h-4 w-4" />
          Search jollof, shawarma, zobo…
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2">
          {services.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1.5">
              <span className={cx('grid h-12 w-12 place-items-center rounded-2xl', s.cls)}>
                <s.icon className="h-5 w-5" strokeWidth={2.3} />
              </span>
              <span className="text-[10px] font-bold">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-[13px] font-extrabold">Popular near you</p>
          <p className="text-[11px] font-bold text-app-blue">See all</p>
        </div>
        <div className="mt-2 flex gap-3">
          {kitchens.map((k) => (
            <div key={k.name} className="w-[138px] shrink-0 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
              <img src={k.img} alt="" className="h-[82px] w-full object-cover" />
              <div className="p-2">
                <p className="truncate text-[11.5px] font-extrabold">{k.name}</p>
                <p className="mt-0.5 flex items-center gap-1 text-[9.5px] font-semibold text-app-muted">
                  <Star className="h-2.5 w-2.5 fill-[#FFB020] text-[#FFB020]" />
                  {k.rating} · {k.eta}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-3 rounded-2xl bg-white p-2 shadow-sm ring-1 ring-black/5">
          <img src={FOOD.puffPuff} alt="" className="h-12 w-12 rounded-xl object-cover" />
          <div className="min-w-0 flex-1">
            <p className="text-[11.5px] font-extrabold">Small Chops Hub</p>
            <p className="text-[9.5px] text-app-muted">Puff-puff, samosa, spring rolls</p>
          </div>
          <span className="rounded-full bg-[#FFEDE6] px-2 py-1 text-[9px] font-extrabold text-app-orange">Hot</span>
        </div>
      </div>
      <TabBar tabs={BUYER_TABS} active={0} look="buyer" />
    </div>
  )
}

/* ── Buyer: live tracking ───────────────────────────────────────────────── */

const ROUTE = 'M 52 262 L 52 196 Q 52 184 64 184 L 150 184 Q 162 184 162 172 L 162 104 Q 162 92 174 92 L 244 92'

// City blocks between the streets at x = 52, 162 and y = 92, 184.
const BLOCKS: [number, number, number, number][] = [
  [-20, -20, 60, 100], [64, -20, 86, 100], [174, -20, 146, 100],
  [-20, 104, 60, 68], [64, 104, 86, 68], [174, 104, 146, 68],
  [-20, 196, 60, 160], [64, 196, 86, 160], [174, 196, 146, 160],
]

export function TrackingScreen() {
  const reduce = useReducedMotion()

  return (
    <div className="relative flex h-full flex-col bg-white text-[#0B1220]">
      <div className="relative h-[330px] shrink-0 overflow-hidden bg-[#DFE6EF]">
        <svg viewBox="0 0 300 330" className="absolute inset-0 h-full w-full">
          {BLOCKS.map(([x, y, w, h], i) => (
            <rect key={i} x={x} y={y} width={w} height={h} rx={12} fill={i === 4 ? '#CFEBD9' : '#F6F8FB'} />
          ))}
          <path d={ROUTE} stroke="#1F77F1" strokeOpacity={0.16} strokeWidth={11} strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <motion.path
            d={ROUTE}
            stroke="#1F77F1"
            strokeWidth={4.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
          />
          <g transform="translate(52 262)">
            <circle r="15" fill="#FF5A1F" fillOpacity="0.2" />
            <circle r="9" fill="#FF5A1F" />
            <circle r="3.5" fill="#fff" />
          </g>
          <g transform="translate(244 92)">
            <circle r="17" fill="#1F77F1" fillOpacity="0.18" />
            <circle r="9" fill="#1F77F1" />
            <circle r="3.5" fill="#fff" />
          </g>
          <g transform={reduce ? 'translate(162 150)' : undefined}>
            {!reduce && (
              <animateMotion dur="8s" repeatCount="indefinite" path={ROUTE} keyPoints="0;1;1" keyTimes="0;0.8;1" calcMode="linear" />
            )}
            <circle r="15" fill="#0A0F12" />
            <circle r="15" fill="none" stroke="#AFFF00" strokeWidth="2.5" />
            <Bike x={-8} y={-8} width={16} height={16} color="#AFFF00" strokeWidth={2.4} />
          </g>
        </svg>
        <span className="absolute top-[247px] left-[70px] rounded-full bg-white px-2 py-1 text-[9.5px] font-extrabold shadow-sm">
          Mama T&apos;s Kitchen
        </span>
        <span className="absolute top-[110px] left-[216px] rounded-full bg-[#0B1220] px-2 py-1 text-[9.5px] font-extrabold text-white shadow-sm">
          Hall 3
        </span>
        <div className="absolute inset-x-0 top-0">
          <StatusBar />
          <div className="flex items-center justify-between px-4">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white shadow-sm">
              <ArrowLeft className="h-4 w-4" />
            </span>
            <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-extrabold shadow-sm">Help</span>
          </div>
        </div>
      </div>

      <div className="relative -mt-6 flex flex-1 flex-col rounded-t-[26px] bg-white px-4 pt-2.5 shadow-[0_-10px_30px_rgba(11,18,32,0.08)]">
        <span className="mx-auto h-1 w-10 rounded-full bg-black/10" />
        <p className="mt-3 text-[10px] font-extrabold tracking-[0.14em] text-app-blue uppercase">On the way</p>
        <div className="flex items-end justify-between">
          <p className="font-display text-[22px] leading-tight font-extrabold tracking-tight">Arriving in 6 min</p>
          <p className="pb-1 text-[9.5px] font-semibold text-app-muted">#BLB-2041</p>
        </div>

        <div className="mt-3 grid grid-cols-4 gap-1.5">
          {['Confirmed', 'Cooking', 'On the way', 'Delivered'].map((s, i) => (
            <div key={s}>
              <span className={cx('block h-1.5 rounded-full', i < 2 ? 'bg-app-blue' : i === 2 ? 'pulse-dot bg-app-blue' : 'bg-black/10')} />
              <span className={cx('mt-1.5 block text-[8.5px] font-bold', i <= 2 ? 'text-[#0B1220]' : 'text-app-muted')}>{s}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-app-canvas p-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[#0A0F12] font-display text-[13px] font-extrabold text-volt">DA</span>
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-extrabold">Dayo is on the way</p>
            <p className="flex items-center gap-1 text-[9.5px] font-semibold text-app-muted">
              Blorbmart rider · <Star className="h-2.5 w-2.5 fill-[#FFB020] text-[#FFB020]" /> 4.9
            </p>
          </div>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-app-blue ring-1 ring-black/5">
            <MessageCircle className="h-4 w-4" />
          </span>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-app-blue text-white">
            <PhoneIcon className="h-4 w-4" />
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-dashed border-black/10 pt-3 text-[10.5px]">
          <span className="text-app-muted">2× Jollof & chicken · 1× Zobo</span>
          <span className="tnum font-extrabold">₦5,300</span>
        </div>
      </div>
    </div>
  )
}

/* ── Buyer: airtime ─────────────────────────────────────────────────────── */

const NETWORKS = [
  { name: 'MTN', badge: 'MTN', cls: 'bg-[#FFCB05] text-black' },
  { name: 'Airtel', badge: 'airtel', cls: 'bg-[#E40000] text-white' },
  { name: 'Glo', badge: 'glo', cls: 'bg-[#50B651] text-white' },
  { name: '9mobile', badge: '9m', cls: 'bg-[#006B3E] text-white' },
]

export function BillsScreen() {
  const ref = useRef<HTMLDivElement>(null)
  const done = useLoop(ref, 3400, 2600)

  return (
    <div ref={ref} className="relative flex h-full flex-col bg-app-canvas text-[#0B1220]">
      <div className="bg-app-blue pb-7 text-white">
        <StatusBar light />
        <div className="flex items-center gap-3 px-4 pt-1">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15">
            <ArrowLeft className="h-4 w-4" />
          </span>
          <div>
            <p className="font-display text-[18px] leading-tight font-extrabold">Buy airtime</p>
            <p className="text-[10.5px] text-white/85">Instant top-up on any network</p>
          </div>
        </div>
      </div>

      <div className="-mt-4 flex-1 rounded-t-[22px] bg-app-canvas px-4 pt-4">
        <p className="text-[10px] font-extrabold tracking-[0.12em] text-app-muted uppercase">Network</p>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {NETWORKS.map((n, i) => (
            <div key={n.name} className="flex flex-col items-center gap-1.5">
              <span
                className={cx(
                  'relative grid h-[52px] w-[52px] place-items-center rounded-2xl text-[11px] font-extrabold',
                  n.cls,
                  i === 0 && 'ring-[3px] ring-app-blue ring-offset-2 ring-offset-app-canvas',
                )}
              >
                {n.badge}
                {i === 0 && (
                  <span className="absolute -top-1.5 -right-1.5 grid h-4.5 w-4.5 place-items-center rounded-full bg-app-blue text-white">
                    <Check className="h-3 w-3" strokeWidth={3.5} />
                  </span>
                )}
              </span>
              <span className="text-[10px] font-semibold text-app-muted">{n.name}</span>
            </div>
          ))}
        </div>

        <p className="mt-4 text-[10px] font-extrabold tracking-[0.12em] text-app-muted uppercase">Phone number</p>
        <div className="mt-2 flex h-11 items-center justify-between rounded-2xl bg-white px-3.5 text-[13px] font-bold ring-1 ring-black/[0.06]">
          <span className="tnum">0803 456 7214</span>
          <Smartphone className="h-4 w-4 text-app-muted" />
        </div>

        <p className="mt-4 text-[10px] font-extrabold tracking-[0.12em] text-app-muted uppercase">Amount</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {['100', '200', '500', '1,000', '2,000', '5,000'].map((a) => (
            <span
              key={a}
              className={cx(
                'tnum grid h-10 place-items-center rounded-xl text-[12.5px] font-extrabold',
                a === '500'
                  ? 'bg-app-blue text-white shadow-[0_8px_18px_-8px_rgba(31,119,241,0.8)]'
                  : 'bg-white ring-1 ring-black/[0.06]',
              )}
            >
              ₦{a}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between rounded-2xl bg-white px-3.5 py-3 ring-1 ring-black/[0.06]">
          <span className="flex items-center gap-2 text-[11.5px] font-bold">
            <Wallet className="h-4 w-4 text-app-blue" />
            Pay from wallet
          </span>
          <span className="tnum text-[11px] font-semibold text-app-muted">₦12,450.00</span>
        </div>
      </div>

      <div className="px-4 pt-3 pb-7">
        <span className="grid h-12 place-items-center rounded-2xl bg-app-blue text-[14px] font-extrabold text-white">Pay ₦500</span>
      </div>

      <AnimatePresence>
        {done && (
          <motion.div
            className="absolute inset-0 z-20 flex flex-col justify-end bg-[#0B1220]/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              className="rounded-t-[26px] bg-white px-5 pt-3 pb-8 text-center"
            >
              <span className="mx-auto block h-1 w-10 rounded-full bg-black/10" />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 420, damping: 16 }}
                className="mx-auto mt-4 grid h-14 w-14 place-items-center rounded-full bg-[#0FA968] text-white"
              >
                <Check className="h-7 w-7" strokeWidth={3.2} />
              </motion.span>
              <p className="mt-3 font-display text-[20px] font-extrabold">Airtime sent!</p>
              <p className="mt-1 text-[11.5px] text-app-muted">₦500 MTN airtime to 0803 456 7214</p>
              <div className="mt-4 flex items-center gap-3 rounded-2xl bg-app-canvas p-3 text-left">
                <QrCode seed={88} className="h-14 w-14 shrink-0 text-[#0B1220]" />
                <div className="min-w-0">
                  <p className="flex items-center gap-1 text-[11px] font-extrabold text-[#0FA968]">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Verified receipt
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] text-app-muted">REF BLB-8F2K-19QX</p>
                  <p className="text-[10px] text-app-muted">Scan to confirm this payment</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Rider: online ──────────────────────────────────────────────────────── */

const RIDER_TABS: Tab[] = [
  { label: 'Home', icon: House },
  { label: 'Jobs', icon: Package },
  { label: 'Earnings', icon: Wallet },
  { label: 'Account', icon: User },
]

const RIDER_JOBS = [
  { from: "Mama T's Kitchen", to: 'Hall 3, Room 214', km: '1.2 km', earn: '₦480' },
  { from: 'Shawarma Spot', to: 'Faculty of Science', km: '0.8 km', earn: '₦450' },
]

export function RiderScreen() {
  const ref = useRef<HTMLDivElement>(null)
  // The job card never leaves; the loop swaps which job is on offer.
  const flip = useLoop(ref, 3800, 3800)
  const job = RIDER_JOBS[flip ? 1 : 0]

  return (
    <div ref={ref} className="relative flex h-full flex-col bg-void text-white">
      <StatusBar light />
      <div className="px-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] text-fog">Good evening</p>
            <p className="font-display text-[20px] font-extrabold tracking-tight">Dayo</p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-volt px-3 py-1.5 text-[10.5px] font-extrabold text-void">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-void" />
            Online
          </span>
        </div>

        <div className="dotfield relative mt-4 grid h-[150px] place-items-center overflow-hidden rounded-3xl bg-surface ring-1 ring-line">
          <span className="radar-ring absolute h-16 w-16 rounded-full border-2 border-volt/60" />
          <span className="radar-ring-delayed absolute h-16 w-16 rounded-full border-2 border-volt/60" />
          <span className="relative grid h-14 w-14 place-items-center rounded-full bg-volt text-void shadow-[0_0_40px_rgba(175,255,0,0.5)]">
            <Bike className="h-6 w-6" strokeWidth={2.4} />
          </span>
          <p className="absolute bottom-3 text-[10px] font-semibold text-fog">Jobs near Hall 3 will ping you</p>
        </div>

        <div className="mt-3 rounded-2xl bg-surface p-3.5 ring-1 ring-line">
          <p className="text-[10px] font-bold tracking-[0.14em] text-fog uppercase">Today</p>
          <p className="aura-volt tnum font-display text-[27px] leading-tight font-extrabold text-volt">₦2,880</p>
          <p className="text-[10.5px] text-fog">6 deliveries · 3h 20m online</p>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {
            <motion.div
              key={job.from}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 26 }}
              className="mt-3 rounded-2xl bg-raised p-3.5 ring-1 ring-ember/50"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-ember/15 px-2 py-1 text-[9.5px] font-extrabold text-ember-light">New delivery</span>
                <span className="text-[10px] font-bold text-fog">{job.km}</span>
              </div>
              <div className="mt-2.5 space-y-1.5 text-[11px] font-semibold">
                <p className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-ember" />{job.from}</p>
                <p className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-volt" />{job.to}</p>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <p className="flex-1 text-[10px] text-fog">
                  You earn <span className="tnum block font-display text-[17px] font-extrabold text-volt">{job.earn}</span>
                </p>
                <span className="rounded-xl px-3 py-2 text-[11px] font-bold text-fog ring-1 ring-line">Decline</span>
                <span className="rounded-xl bg-ember px-4 py-2 text-[11px] font-extrabold text-void">Accept</span>
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>
      <TabBar tabs={RIDER_TABS} active={0} look="rider" />
    </div>
  )
}

/* ── Vendor: dashboard ──────────────────────────────────────────────────── */

const VENDOR_TABS: Tab[] = [
  { label: 'Home', icon: House },
  { label: 'Orders', icon: ShoppingBag },
  { label: 'Products', icon: Package },
  { label: 'Wallet', icon: Wallet },
  { label: 'Profile', icon: User },
]

export function VendorScreen() {
  const ref = useRef<HTMLDivElement>(null)
  const toast = useLoop(ref, 2800, 2600)
  const bars = [38, 60, 46, 74, 55, 92, 68]

  return (
    <div ref={ref} className="relative flex h-full flex-col bg-[#F5F5FB] text-[#10121A]">
      <div className="relative overflow-hidden rounded-b-[26px] bg-linear-to-br from-iris to-iris-deep pb-5 text-white">
        <span className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-white/10" />
        <span className="absolute -bottom-16 -left-10 h-32 w-32 rounded-full bg-white/[0.07]" />
        <StatusBar light />
        <div className="relative px-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-white/75">Good morning</p>
              <p className="font-display text-[19px] font-extrabold tracking-tight">Mama T&apos;s Kitchen</p>
            </div>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-app-blue ring-2 ring-white/40">
              <Mark className="h-5 w-5 text-white" />
            </span>
          </div>
          <div className="mt-3 flex gap-1.5 text-[10px] font-bold">
            <span className="flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 ring-1 ring-white/25">
              <Star className="h-3 w-3 fill-white" /> 4.8
            </span>
            <span className="rounded-full bg-white/15 px-2.5 py-1 ring-1 ring-white/25">128 orders</span>
            <span className="flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 ring-1 ring-white/25">
              <span className="h-1.5 w-1.5 rounded-full bg-[#3BE39A]" /> Open
            </span>
          </div>
        </div>
      </div>

      <div className="px-4">
        <div className="relative mt-4 overflow-hidden rounded-3xl bg-iris p-4 text-white">
          <span className="absolute -top-8 -right-8 h-28 w-28 rounded-full bg-white/10" />
          <p className="text-[9.5px] font-bold tracking-[0.14em] text-white/75 uppercase">Available balance</p>
          <p className="tnum mt-1 font-display text-[26px] leading-none font-extrabold">₦48,250.00</p>
          <p className="mt-1 text-[10.5px] text-white/75">Ready to withdraw</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-white/12 px-2.5 py-2">
              <p className="text-[8.5px] font-bold tracking-wider text-white/70 uppercase">Pending</p>
              <p className="tnum text-[12px] font-extrabold">₦3,500.00</p>
            </div>
            <div className="rounded-xl bg-white/12 px-2.5 py-2">
              <p className="text-[8.5px] font-bold tracking-wider text-white/70 uppercase">This week</p>
              <p className="tnum text-[12px] font-extrabold">₦61,900.00</p>
            </div>
          </div>
        </div>

        <div className="mt-3 rounded-2xl bg-white p-3 ring-1 ring-black/[0.05]">
          <div className="flex items-center justify-between">
            <p className="text-[11.5px] font-extrabold">Revenue · last 7 days</p>
            <p className="text-[10px] font-bold text-[#0FA968]">+18%</p>
          </div>
          <div className="mt-3 flex h-[70px] items-end gap-2">
            {bars.map((h, i) => (
              <motion.span
                key={i}
                className={cx('flex-1 origin-bottom rounded-md', i === 5 ? 'bg-iris' : 'bg-iris/20')}
                style={{ height: `${h}%` }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </div>
          <div className="mt-1.5 flex justify-between px-1 text-[8.5px] font-bold text-[#8B8FA3]">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <span key={i} className={i === 5 ? 'text-iris' : undefined}>{d}</span>
            ))}
          </div>
        </div>
      </div>

      <TabBar tabs={VENDOR_TABS} active={0} look="vendor" />

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="absolute inset-x-3 top-11 z-30 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-[0_18px_40px_-12px_rgba(16,18,26,0.45)]"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ember text-void">
              <Bell className="h-4.5 w-4.5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[11.5px] font-extrabold">New order · #ORD-2093</p>
              <p className="truncate text-[10px] text-[#6B6F80]">2× Jollof & chicken · ₦5,000</p>
            </div>
            <span className="rounded-full bg-iris px-2.5 py-1.5 text-[10px] font-extrabold text-white">View</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
