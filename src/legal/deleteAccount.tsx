import { Mail } from 'lucide-react'
import { WhatsAppIcon } from '../components/BrandIcons'
import { Button } from '../components/ui'
import { LEGAL, LINKS, mailto } from '../content'
import { CompanyDetails, EmailLink, WHATSAPP_NUMBER, WhatsAppLink, whatsapp } from './bits'
import type { LegalDoc } from './docs'

const SUBJECT = 'Delete my account'

const EMAIL_BODY = [
  'Please delete my Blorbmart account.',
  '',
  'Full name:',
  'Email address on the account:',
  'Phone number on the account:',
  'Account type (buyer / vendor / rider):',
  'Store name (vendors only):',
  '',
  'I understand that deletion is permanent.',
].join('\n')

const WHATSAPP_TEXT =
  'Hi Blorbmart, please delete my account. My full name is ___, the email on my account is ___ and my account type is ___ (buyer / vendor / rider).'

const STEPS = [
  {
    title: 'Send a request',
    // The address itself is on the button below. In this narrow card it
    // broke mid-word.
    text: 'Email us from the address on your account, or message us on WhatsApp from its phone number.',
  },
  {
    title: "Confirm it's you",
    text: "We reply to check the request really came from you. We will never ask for your password or PIN.",
  },
  {
    title: 'We delete it',
    text: `Within ${LEGAL.deletionDays} days of confirming, we delete your account and email you when it's done.`,
  },
]

function Lead() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-void p-6 text-white sm:p-10">
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-iris/30 blur-[90px]" />
      <p className="relative text-[0.7rem] font-extrabold tracking-[0.2em] text-volt uppercase">The short version</p>
      <h2 className="relative mt-3 max-w-xl text-[clamp(1.6rem,3.2vw,2.3rem)] leading-[1.05] font-extrabold tracking-[-0.025em]">
        Ask us to delete it, from the email or phone on your account.
      </h2>

      <ol className="relative mt-7 grid gap-3 sm:grid-cols-3">
        {STEPS.map((step, i) => (
          <li key={step.title} className="rounded-2xl bg-white/[0.05] p-5 ring-1 ring-white/10 ring-inset">
            <span className="inline-grid h-8 w-8 place-items-center rounded-full bg-volt font-display text-sm font-extrabold text-void">
              {i + 1}
            </span>
            <h3 className="mt-3 font-bold">{step.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed break-words text-white/65">{step.text}</p>
          </li>
        ))}
      </ol>

      <div className="relative mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button href={mailto(SUBJECT, EMAIL_BODY)} size="lg" arrow={false} icon={<Mail className="h-5 w-5" aria-hidden="true" />}>
          Email a deletion request
        </Button>
        <Button
          href={whatsapp(WHATSAPP_TEXT)}
          variant="ghost-light"
          size="lg"
          arrow={false}
          icon={<WhatsAppIcon className="h-5 w-5 text-volt" />}
        >
          Ask on WhatsApp
        </Button>
      </div>

      <dl className="relative mt-8 grid gap-5 border-t border-white/10 pt-6 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-xs font-extrabold tracking-[0.16em] text-white/45 uppercase">Apps</dt>
          <dd className="mt-1.5 font-semibold">Blorbmart, Blorbmart Vendor and Blorbmart Rider</dd>
        </div>
        <div>
          <dt className="text-xs font-extrabold tracking-[0.16em] text-white/45 uppercase">Developer</dt>
          <dd className="mt-1.5 font-semibold">{LEGAL.company}</dd>
        </div>
        <div>
          <dt className="text-xs font-extrabold tracking-[0.16em] text-white/45 uppercase">Time to delete</dt>
          <dd className="mt-1.5 font-semibold">Up to {LEGAL.deletionDays} days after we confirm it's you</dd>
        </div>
      </dl>
    </div>
  )
}

export const DELETE_ACCOUNT: LegalDoc = {
  eyebrow: 'Your data',
  title: 'Delete your account',
  summary:
    'How to delete your Blorbmart, Blorbmart Vendor or Blorbmart Rider account, what we delete, what the law makes us keep, and how long it takes.',
  lead: <Lead />,
  sections: [
    {
      id: 'covered',
      title: 'Which accounts this covers',
      body: (
        <>
          <p>This page applies to every account on Blorbmart, all run by {LEGAL.company}:</p>
          <ul>
            <li><strong>Blorbmart</strong> — the buyer app on Google Play and the web app at <a href={LINKS.webApp} target="_blank" rel="noopener noreferrer">{new URL(LINKS.webApp).host}</a>.</li>
            <li><strong>Blorbmart Vendor</strong> — for stores and event organisers, on Google Play and at <a href={LINKS.vendorWeb} target="_blank" rel="noopener noreferrer">{new URL(LINKS.vendorWeb).host}</a>.</li>
            <li><strong>Blorbmart Rider</strong> — the rider web app at <a href={LINKS.riderApp} target="_blank" rel="noopener noreferrer">{new URL(LINKS.riderApp).host}</a>.</li>
          </ul>
          <p>If you have more than one of these accounts, one request can cover them all — just tell us which.</p>
        </>
      ),
    },
    {
      id: 'how',
      title: 'How to ask',
      body: (
        <>
          <h3>By email</h3>
          <p>Write to <EmailLink subject={SUBJECT} body={EMAIL_BODY} /> from the email address on your account, with the subject “{SUBJECT}”. Include:</p>
          <ul>
            <li>your full name;</li>
            <li>the email address and phone number on the account;</li>
            <li>the account type — buyer, vendor or rider;</li>
            <li>your store name, if you are a vendor.</li>
          </ul>
          <h3>By WhatsApp</h3>
          <p>Message <WhatsAppLink text={WHATSAPP_TEXT}>{WHATSAPP_NUMBER}</WhatsAppLink> from the phone number on your account with the same details.</p>
          <h3>Confirming it's you</h3>
          <p>To stop anyone deleting an account that isn't theirs, we will confirm the request with you — by replying to the account's email address or sending a code to its phone number — before we delete anything. We will never ask for your password or wallet PIN.</p>
        </>
      ),
    },
    {
      id: 'before',
      title: 'Before you ask',
      body: (
        <ul>
          <li><strong>Finish anything in progress.</strong> Orders being prepared or delivered, and events you are selling tickets for, must be completed or cancelled first.</li>
          <li><strong>Deal with any money left.</strong> Buyers should spend their wallet balance. Vendors and riders should withdraw their earnings. If you can't, tell us in your request and we will sort it out with you before deleting anything.</li>
          <li><strong>Save what you need.</strong> Download any receipts you want to keep — you won't be able to sign in once the account is gone.</li>
        </ul>
      ),
    },
    {
      id: 'deleted',
      title: 'What we delete',
      body: (
        <>
          <ul>
            <li>Your profile: name, email address, phone number, campus and profile photo.</li>
            <li>Your sign-in account and password.</li>
            <li>Saved delivery addresses and map pins.</li>
            <li>Your wallet PIN, device notification tokens and referral code.</li>
            <li><strong>Vendors:</strong> your store, menu, product photos, store location, bank account details and verification information.</li>
            <li><strong>Riders:</strong> your vehicle details, ID type and number, bank account details and latest location.</li>
          </ul>
          <p>Deletion is permanent. We can't restore a deleted account, its history or its referral rewards — to use Blorbmart again you would need to sign up afresh.</p>
        </>
      ),
    },
    {
      id: 'kept',
      title: 'What we keep, and for how long',
      body: (
        <>
          <p>Some records outlive the account because the law requires them or because other people depend on them:</p>
          <ul>
            <li><strong>Payment, order, top-up, ticket and payout records</strong> — kept for {LEGAL.recordYears} years to meet tax and company-law record-keeping rules. We keep only what is needed to identify each transaction.</li>
            <li><strong>Records linked to fraud, a dispute or a legal claim</strong> — kept until the matter is closed.</li>
            <li><strong>Messages you sent our support team</strong> — kept until your request and any follow-up are dealt with.</li>
            <li><strong>Ratings you gave</strong> — stay in a store's or rider's average, but are no longer linked to you.</li>
          </ul>
          <p>Statistics we have already combined — such as the number of orders on a campus in a month — contain no personal data and are not affected.</p>
        </>
      ),
    },
    {
      id: 'timeline',
      title: 'How long it takes',
      body: (
        <p>We reply to confirm we have your request, check that it came from you, and then delete your account within {LEGAL.deletionDays} days. We email you when it's done. The records described above are deleted when their retention period ends.</p>
      ),
    },
    {
      id: 'partial',
      title: 'Deleting some data but keeping your account',
      body: (
        <p>You don't have to close your account to remove data. You can edit or delete saved addresses and your profile photo in the app, and you can ask us to delete other specific data by emailing <EmailLink subject="Delete some of my data" />. We will explain if something can't be deleted while your account stays open — for example, your phone number, which riders need to reach you.</p>
      ),
    },
    {
      id: 'contact',
      title: 'Questions',
      body: (
        <>
          <p>Our <a href={LINKS.privacy}>Privacy Policy</a> has more on how we handle your data. For anything else about deleting your account, get in touch:</p>
          <CompanyDetails subject={SUBJECT} />
        </>
      ),
    },
  ],
}
