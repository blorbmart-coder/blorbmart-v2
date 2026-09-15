import { LEGAL, LINKS } from '../content'
import { CompanyDetails, EmailLink, WhatsAppLink, campusList } from './bits'
import type { LegalDoc } from './docs'

export const TERMS: LegalDoc = {
  eyebrow: 'Legal',
  title: 'Terms of Use',
  summary:
    'The agreement between you and Blorbmart when you order food, pay bills, buy event tickets, sell as a vendor or deliver as a rider. Using Blorbmart means you accept it, so please read it through.',
  sections: [
    {
      id: 'about',
      title: 'About these terms',
      body: (
        <>
          <p>These Terms of Use are a contract between you and {LEGAL.company} (“Blorbmart”, “we”, “us”). They cover the Blorbmart app, Blorbmart Vendor, Blorbmart Rider, our web apps and this website — together, the “Services”.</p>
          <p>By creating an account or using the Services, you agree to these terms and to our <a href={LINKS.privacy}>Privacy Policy</a>. If you don't agree, please don't use the Services.</p>
          <p>Some features come with extra rules that we show you when you use them, such as a promotion's conditions or an event organiser's entry policy. Those rules form part of these terms.</p>
        </>
      ),
    },
    {
      id: 'eligibility',
      title: 'Who can use Blorbmart',
      body: (
        <>
          <ul>
            <li>You must be at least 18 years old, or have a parent's or guardian's permission to use Blorbmart and to pay on it.</li>
            <li>Give us accurate details when you sign up — your real name, phone number, email and campus — and keep them up to date.</li>
            <li>Your account is personal. Don't share it, sell it or let someone else use it.</li>
            <li>You are responsible for what happens on your account. Keep your password and wallet PIN secret, and tell us straight away if you think someone else has used your account.</li>
          </ul>
          <p>The food marketplace runs on the campuses we operate on: {campusList()}. Airtime, data, electricity and TV payments work anywhere in Nigeria.</p>
        </>
      ),
    },
    {
      id: 'marketplace',
      title: 'What Blorbmart does',
      body: (
        <>
          <p>Blorbmart is a marketplace. Independent vendors — kitchens, shops and event organisers — sell through us, riders deliver, and we run the platform, take payments and provide support.</p>
          <ul>
            <li><strong>Vendors are responsible for what they sell</strong>, including its quality, ingredients, hygiene, portion sizes and how it is described.</li>
            <li><strong>Event organisers are responsible for their events</strong>, including what happens on the day.</li>
            <li><strong>Bills and top-ups are fulfilled by licensed providers.</strong> We pass on your request and payment; the network, electricity distribution company or TV provider delivers the service.</li>
          </ul>
          <p>We work hard to keep the Services running and accurate, but we can't promise they will always be available, uninterrupted or free of errors.</p>
        </>
      ),
    },
    {
      id: 'orders',
      title: 'Orders, prices and delivery',
      body: (
        <>
          <ul>
            <li>Vendors set their own prices. Before you pay, checkout shows your total, including the delivery fee and any service fee.</li>
            <li>An order is placed only once your payment is confirmed. Until then the vendor does not see it and nothing is prepared.</li>
            <li>A vendor may decline or cancel an order if an item runs out or they can't fulfil it. If that happens you will not be charged for what you didn't get — see <a href="#refunds">Cancellations, refunds and complaints</a>.</li>
            <li>Delivery times are estimates. Keep your phone on and be at the delivery point you chose.</li>
            <li>Some orders are handed over only after you tell the rider the delivery PIN shown in your app. Share it only once you have your order in hand — giving the PIN confirms you received it.</li>
            <li>If you have an allergy, check with the vendor before ordering. We can't guarantee that any item is free of a particular ingredient.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'payments',
      title: 'Payments and your wallet',
      body: (
        <>
          <ul>
            <li>Card, bank transfer and USSD payments are processed by Paystack. We never see or store your full card number.</li>
            <li>You can add money to your Blorbmart wallet and use the balance to pay on Blorbmart. The wallet is not a bank account: it earns no interest and can't be used outside Blorbmart. It is protected by a PIN you choose.</li>
            <li>Every payment comes with a receipt that carries a QR code, so anyone can check it is genuine.</li>
            <li>If you are charged but your order, top-up or ticket doesn't come through, tell us. We will trace the payment with our partners and, if the money reached us and you didn't get what you paid for, credit it back.</li>
            <li>If money lands in your wallet by mistake, we may reverse it.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'bills',
      title: 'Airtime, data, electricity and TV',
      body: (
        <>
          <ul>
            <li>Check the phone, meter or smartcard number carefully before you pay. A top-up sent to a number you entered wrongly usually can't be reversed.</li>
            <li>Most top-ups arrive within seconds, but providers sometimes run late. If yours hasn't arrived within a few hours, contact us with the receipt.</li>
            <li>Electricity tokens are issued by your distribution company. Tariffs, metering and supply are theirs, not ours.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'tickets',
      title: 'Event tickets',
      body: (
        <>
          <ul>
            <li>We sell tickets on behalf of the event organiser. The organiser sets the price, entry rules and age limits, and is responsible for the event.</li>
            <li>Each ticket has a QR code that is scanned once at the door. Keep it private — whoever shows it first gets in.</li>
            <li>If an event is cancelled or changes significantly, contact us and we will work with the organiser on a refund.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'refunds',
      title: 'Cancellations, refunds and complaints',
      body: (
        <>
          <ul>
            <li>If something goes wrong — an item is missing, the order is wrong, it never arrived or the food is spoiled — contact us as soon as you can, ideally within 24 hours. Send your order number and a photo if it helps.</li>
            <li>We will look into it with the vendor and the rider. Where you are owed a refund, we will credit your Blorbmart wallet or return the money to how you paid.</li>
            <li>Once a vendor has started preparing your order, it may no longer be possible to cancel it.</li>
          </ul>
          <p>Reach us by email at <EmailLink subject="Order problem" /> or on WhatsApp at <WhatsAppLink text="Hi Blorbmart, I have a problem with an order." />. Nothing in these terms takes away your rights under the Federal Competition and Consumer Protection Act 2018.</p>
        </>
      ),
    },
    {
      id: 'vendors',
      title: 'If you sell on Blorbmart',
      body: (
        <>
          <p>These extra terms apply if you use Blorbmart Vendor.</p>
          <ul>
            <li><strong>Approval.</strong> We review stores before they go live and may ask for information to verify you or your business. We may decline a store or suspend one that breaks these terms.</li>
            <li><strong>Listings.</strong> Keep names, prices, photos, descriptions and availability accurate. Upload only photos you have the right to use.</li>
            <li><strong>The law.</strong> You are responsible for any permits, food-safety and hygiene standards, and taxes that apply to your business.</li>
            <li><strong>Orders.</strong> Accept or decline orders promptly, prepare them as described, package them safely and hand them to the assigned rider.</li>
            <li><strong>Money.</strong> We collect payment from buyers, deduct the commission and fees shown in Blorbmart Vendor, and credit the rest to your seller wallet. You can withdraw to a verified Nigerian bank account in your name or your business's name. We may hold funds tied to a dispute or suspected fraud while we investigate.</li>
            <li><strong>Events.</strong> If you sell tickets, run the event as advertised and deal fairly with ticket holders if it is cancelled or changed.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'riders',
      title: 'If you deliver with Blorbmart',
      body: (
        <>
          <p>These extra terms apply if you use Blorbmart Rider.</p>
          <ul>
            <li><strong>Independence.</strong> You choose when to go online and which deliveries to accept. Delivering with Blorbmart does not make you our employee.</li>
            <li><strong>Your details.</strong> Give accurate identity and vehicle details. If you ride a motorbike or drive a car, you must hold a valid licence and keep the vehicle registered and roadworthy.</li>
            <li><strong>Safety.</strong> Follow traffic laws and never ride in a way that puts you or others at risk.</li>
            <li><strong>Location.</strong> While you are online, the app shares your location so we can offer you nearby deliveries and show buyers where their order is. The <a href={LINKS.privacy}>Privacy Policy</a> explains exactly what is shared and kept.</li>
            <li><strong>Handling orders.</strong> Don't open, tamper with or keep anything you carry. Hand orders only to the buyer, using the delivery PIN when the app asks for one.</li>
            <li><strong>Earnings.</strong> You earn the amount shown in the app for each completed delivery. Earnings go to your rider wallet and can be withdrawn to your verified bank account. We may hold earnings tied to an unfinished or disputed delivery while we look into it.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'acceptable-use',
      title: 'What you must not do',
      body: (
        <ul>
          <li>Break the law, or use Blorbmart to help anyone else break it.</li>
          <li>Commit fraud — including stolen cards, false chargebacks, fake orders or fake deliveries.</li>
          <li>Abuse promotions or referrals, for example by opening several accounts.</li>
          <li>Harass, threaten or abuse riders, vendors, buyers or our staff.</li>
          <li>Upload anything unlawful, misleading, offensive or that belongs to someone else.</li>
          <li>Try to get round our security, scrape our apps, copy or reverse-engineer them, or overload our systems.</li>
          <li>Pretend to be someone else, or to act for Blorbmart when you don't.</li>
        </ul>
      ),
    },
    {
      id: 'promotions',
      title: 'Promotions and referrals',
      body: (
        <p>Promo codes and referral rewards come with their own conditions. They may be limited in number, may expire, and have no cash value unless we say otherwise. We may cancel rewards obtained by breaking those conditions or these terms.</p>
      ),
    },
    {
      id: 'content',
      title: 'Our content and yours',
      body: (
        <>
          <p>The Blorbmart name, logo, apps and website belong to us. Please don't use them without our written permission.</p>
          <p>You keep ownership of what you upload — store details, menus, photos and reviews. By uploading it, you give us a non-exclusive, royalty-free licence to host, display and use it to run and promote the Services for as long as it is on Blorbmart.</p>
        </>
      ),
    },
    {
      id: 'suspension',
      title: 'Suspending or closing accounts',
      body: (
        <>
          <p>You can close your account at any time — see <a href={LINKS.deleteAccount}>Delete your account</a>.</p>
          <p>We may suspend or close an account that breaks these terms, puts others at risk, is linked to fraud, or where the law requires it. Where we can, we will tell you why and give you a chance to respond.</p>
          <p>Closing an account doesn't cancel money you owe us, or money we owe you for orders and deliveries already completed.</p>
        </>
      ),
    },
    {
      id: 'liability',
      title: 'Our responsibility to you',
      body: (
        <>
          <p>As far as the law allows, the Services are provided “as is”. We are not responsible for losses caused by a vendor's goods, an organiser's event, a third-party provider, or events outside our reasonable control, such as network or banking outages, strikes or severe weather.</p>
          <p>As far as the law allows, our total liability to you for any claim is limited to the amount you paid for the order, top-up or ticket the claim is about.</p>
          <p>Nothing in these terms limits liability that Nigerian law does not allow us to limit, including liability for death or personal injury caused by our negligence, or for fraud.</p>
        </>
      ),
    },
    {
      id: 'indemnity',
      title: 'Your responsibility to us',
      body: (
        <p>If you break these terms or the law and someone brings a claim against us because of it, you agree to cover our reasonable losses and costs arising from that claim.</p>
      ),
    },
    {
      id: 'disputes',
      title: 'Governing law and disputes',
      body: (
        <>
          <p>These terms are governed by the laws of the Federal Republic of Nigeria.</p>
          <p>If you have a dispute with us, please contact us first — most problems are sorted out quickly that way. If we can't resolve it, the courts of Nigeria will decide it. You can also complain to the Federal Competition and Consumer Protection Commission.</p>
        </>
      ),
    },
    {
      id: 'changes',
      title: 'Changes to these terms',
      body: (
        <p>We may update these terms as Blorbmart grows. The date at the top of this page shows when they last changed. If a change matters, we will tell you in the app or by email before it takes effect. If you keep using Blorbmart after that, you accept the updated terms.</p>
      ),
    },
    {
      id: 'contact',
      title: 'Contact us',
      body: <CompanyDetails subject="Question about the Terms of Use" />,
    },
  ],
}
