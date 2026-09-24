import { LEGAL, LINKS } from '../content'
import { CompanyDetails, EmailLink, Table } from './bits'
import type { LegalDoc } from './docs'

export const PRIVACY: LegalDoc = {
  eyebrow: 'Legal',
  title: 'Privacy Policy',
  summary:
    'What personal data Blorbmart collects, why we need it, who sees it, how long we keep it, and the rights the Nigeria Data Protection Act 2023 gives you over it.',
  sections: [
    {
      id: 'who-we-are',
      title: 'Who we are',
      body: (
        <>
          <p>{LEGAL.company} (“Blorbmart”, “we”, “us”) is the data controller for the personal data described here. This policy covers the Blorbmart app, Blorbmart Vendor, Blorbmart Rider, our web apps and this website.</p>
          <p>We process personal data under the Nigeria Data Protection Act 2023 (NDPA). For anything about your data, email <EmailLink subject="Privacy request" />.</p>
        </>
      ),
    },
    {
      id: 'what-we-collect',
      title: 'What we collect',
      body: (
        <>
          <h3>From everyone with an account</h3>
          <ul>
            <li><strong>Account details:</strong> first and last name, email address, phone number and campus. Your password is handled by Google Firebase Authentication; we never see it.</li>
            <li><strong>Profile photo</strong>, if you add one.</li>
            <li><strong>Addresses:</strong> the delivery addresses and map pins you save. If you allow it, we read your device's location to help you pin an address.</li>
            <li><strong>Orders:</strong> what you ordered, from whom, when, the amounts, delivery details and your receipts.</li>
            <li><strong>Payments and wallet:</strong> payment references and results from Paystack, your wallet balance and transaction history. Your wallet PIN is stored only as a one-way hash, so nobody can read it back. We never receive your full card number.</li>
            <li><strong>Bills:</strong> the phone, meter or smartcard numbers you enter, the plan and amount, and any token issued.</li>
            <li><strong>Event tickets:</strong> the ticket holder's name and email, the ticket's code and whether it has been scanned.</li>
            <li><strong>Messages:</strong> what you send our support team by email or WhatsApp, and the emails, texts, WhatsApp messages and notifications we send you.</li>
            <li><strong>Device and technical data:</strong> a push-notification token for your device, basic device and browser information, and server logs such as IP address, time of request and errors.</li>
          </ul>

          <h3>Extra, if you are a vendor</h3>
          <ul>
            <li>Your business name, business email and phone, campus and store location.</li>
            <li>Your menu, prices and product photos. The Vendor app uses your camera only when you choose to take a product or store photo, or to scan an event ticket at the door. Photos you pick from your gallery come through Android's photo picker, so the app never gets access to the rest of your photos.</li>
            <li>If you allow it, your device's location, once, to pin your store on the map for riders. The Vendor app does not track your location.</li>
            <li>Your bank account (bank, account number and account name), which we check with Paystack before paying out.</li>
            <li>Any information you give us to verify you or your business, and your sales and payout history.</li>
          </ul>

          <h3>Extra, if you are a rider</h3>
          <ul>
            <li>Your vehicle type and plate number.</li>
            <li>The type and number of the ID you give us — student ID, NIN, driver's licence, voter's card or international passport.</li>
            <li>Your bank account, earnings and withdrawal history.</li>
            <li><strong>Your location while you are online.</strong> The Rider app sends your position about every 90 seconds, and about every 20 seconds while you are carrying an order. We keep your latest position on your rider profile, and the positions from a delivery with that order's record. Sharing stops when you go offline. You can refuse location permission and still work, but you won't be matched by distance.</li>
            <li><strong>Usage analytics.</strong> The Rider app uses Google Analytics for Firebase to see how the sign-up pages and app are used — which screens are opened and which steps are completed.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'how-we-use',
      title: 'How we use it, and why we are allowed to',
      body: (
        <>
          <p>The NDPA lets us process personal data only when we have a lawful basis. These are ours:</p>
          <Table
            head={['What we use it for', 'Lawful basis']}
            rows={[
              ['Creating and running your account; taking, preparing and delivering orders; top-ups and tickets', 'Performing our contract with you'],
              ['Taking payments, paying vendors and riders, and handling refunds', 'Contract; legal obligation'],
              ['Offering deliveries to nearby riders and showing buyers live tracking', 'Contract; your consent to location access'],
              ['Order updates, receipts, security codes and account messages', 'Contract'],
              ['Answering support requests and settling disputes', 'Contract; legitimate interests'],
              ['Preventing fraud and keeping the Services secure', 'Legitimate interests; legal obligation'],
              ['Understanding how the apps are used and fixing problems', 'Legitimate interests'],
              ['Newsletters and promotions', 'Your consent, which you can withdraw at any time'],
              ['Keeping tax and accounting records, and answering lawful requests from authorities', 'Legal obligation'],
            ]}
          />
          <p>Delivery dispatch is automated: the system offers each delivery to riders who are online and nearby. If you think an automated decision has treated you unfairly, contact us and a person will review it.</p>
        </>
      ),
    },
    {
      id: 'sharing',
      title: 'Who we share it with',
      body: (
        <>
          <h3>People on the other side of your order</h3>
          <ul>
            <li>The <strong>vendor</strong> sees your name, your order and the delivery details they need to prepare it.</li>
            <li>The <strong>rider</strong> sees your name, phone number, delivery location and instructions so they can reach you.</li>
            <li>As a buyer, you see your rider's name, vehicle and live location while they carry your order.</li>
            <li><strong>Event organisers</strong> see ticket holders' names and who has checked in.</li>
          </ul>

          <h3>Our team</h3>
          <p>Blorbmart staff and campus operations leads can see the data they need for their role — for example, to resolve a complaint or approve a vendor.</p>

          <h3>Service providers</h3>
          <p>These companies process data for us, only on our instructions:</p>
          <Table
            head={['Provider', 'What they do for us']}
            rows={[
              ['Google Firebase', 'Sign-in, database, push notifications and, in the Rider app, analytics'],
              ['Paystack', 'Card, transfer and USSD payments, payouts to banks, and bank-account checks'],
              ['VTpass', 'Airtime, data, electricity and TV payments'],
              ['Cloudinary', 'Storing and serving photos'],
              ['TomTom', 'Address search, maps and route estimates'],
              ['Twilio', 'Text and WhatsApp messages'],
              ['Render and Vercel', 'Hosting our servers and web apps'],
              ['Our email provider', 'Sending receipts, codes and account emails'],
            ]}
          />

          <h3>When the law requires it</h3>
          <p>We may disclose data to police, courts or regulators when the law requires it, or to protect the safety, rights or property of our users, the public or Blorbmart.</p>

          <h3>If Blorbmart changes hands</h3>
          <p>If we merge with or are bought by another company, your data may pass to it, still protected by this policy.</p>

          <p><strong>We do not sell your personal data.</strong></p>
        </>
      ),
    },
    {
      id: 'transfers',
      title: 'Data stored outside Nigeria',
      body: (
        <p>Some of our providers, including Google, Cloudinary, TomTom, Twilio, Render and Vercel, store or process data outside Nigeria. When data leaves Nigeria, we rely on the safeguards the NDPA allows, such as the recipient's contractual commitments to protect it to an adequate standard.</p>
      ),
    },
    {
      id: 'retention',
      title: 'How long we keep it',
      body: (
        <>
          <ul>
            <li><strong>Account data</strong> is kept for as long as your account is open.</li>
            <li><strong>When you delete your account</strong>, we delete or anonymise your data within {LEGAL.deletionDays} days of confirming your request, except for the records below.</li>
            <li><strong>Payment, order, top-up, ticket and payout records</strong> are kept for {LEGAL.recordYears} years, because tax and company law require us to keep financial records.</li>
            <li><strong>Records linked to fraud, a dispute or a legal claim</strong> are kept until the matter is closed.</li>
            <li><strong>Support conversations</strong> are kept for as long as we need them to deal with your request and any follow-up.</li>
          </ul>
          <p>The <a href={LINKS.deleteAccount}>Delete your account</a> page explains the process step by step.</p>
        </>
      ),
    },
    {
      id: 'rights',
      title: 'Your rights',
      body: (
        <>
          <p>Under the NDPA you have the right to:</p>
          <ul>
            <li>be told how your data is used — which is what this policy is for;</li>
            <li>get a copy of the personal data we hold about you;</li>
            <li>have inaccurate data corrected;</li>
            <li>have your data deleted;</li>
            <li>restrict how we use your data, or object to our using it, including for direct marketing;</li>
            <li>receive your data in a portable format;</li>
            <li>withdraw consent you have given, such as for location access or newsletters;</li>
            <li>not be subject to a decision based solely on automated processing that significantly affects you;</li>
            <li>complain to the Nigeria Data Protection Commission (NDPC).</li>
          </ul>
          <p>You can change your name, phone number, addresses and profile photo in the app. For anything else, email <EmailLink subject="Privacy request" />. We may ask you to confirm your identity first, and we will reply within 30 days.</p>
        </>
      ),
    },
    {
      id: 'security',
      title: 'How we protect it',
      body: (
        <>
          <ul>
            <li>All traffic between the apps and our servers is encrypted.</li>
            <li>Access to data is limited by role, so each person sees only what their job needs.</li>
            <li>Wallet PINs are stored as one-way hashes and lock after repeated wrong attempts.</li>
            <li>Delivery PINs make sure orders reach the person who placed them.</li>
          </ul>
          <p>No system is perfectly secure. If a breach is likely to put you at risk, we will tell you and the NDPC as the NDPA requires.</p>
        </>
      ),
    },
    {
      id: 'cookies',
      title: 'Cookies and browser storage',
      body: (
        <>
          <p>This website sets no advertising or tracking cookies. It loads fonts from Google Fonts, which receives your IP address when your browser fetches them.</p>
          <p>Our web apps store your sign-in session and preferences in your browser so you stay signed in. The Rider app's analytics may also store an identifier in your browser. You can clear this storage in your browser settings, though you will be signed out.</p>
        </>
      ),
    },
    {
      id: 'children',
      title: 'Children',
      body: (
        <p>Blorbmart is meant for people aged 18 and over. Anyone younger may use it only with a parent's or guardian's permission. If you believe we hold a child's data without that permission, contact us and we will delete it.</p>
      ),
    },
    {
      id: 'marketing',
      title: 'Marketing messages',
      body: (
        <p>We send newsletters and promotions only if you have agreed to receive them, and every one lets you unsubscribe. Service messages — order updates, receipts and security codes — are part of using Blorbmart and continue while your account is open. You can turn off push notifications in your device settings at any time.</p>
      ),
    },
    {
      id: 'changes',
      title: 'Changes to this policy',
      body: (
        <p>We will update this policy whenever we change how we handle personal data. The date at the top of this page shows when it last changed. If a change matters, we will tell you in the app or by email.</p>
      ),
    },
    {
      id: 'contact',
      title: 'Contact and complaints',
      body: (
        <>
          <CompanyDetails subject="Privacy request" />
          <p>If you are unhappy with how we handle your data, please tell us first so we can put it right. You can also complain to the Nigeria Data Protection Commission at <a href="https://ndpc.gov.ng" target="_blank" rel="noopener noreferrer">ndpc.gov.ng</a>.</p>
        </>
      ),
    },
  ],
}
