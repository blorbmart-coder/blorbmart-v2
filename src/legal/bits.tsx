import type { ReactNode } from 'react'
import { CAMPUSES, LEGAL, LINKS, mailto } from '../content'

/** +234 902 259 4853, read off the wa.me link so the two can't drift apart. */
const digits = LINKS.whatsapp.replace(/\D/g, '')
export const WHATSAPP_NUMBER = `+${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9)}`

export const whatsapp = (text: string) => `${LINKS.whatsapp}?text=${encodeURIComponent(text)}`

export const campusList = () => CAMPUSES.map((c) => `${c.name} (${c.short}, ${c.city})`).join(', ')

/** Support's address as a link, with the subject a request needs filled in. */
export function EmailLink({ subject, body, children }: { subject: string; body?: string; children?: ReactNode }) {
  return <a href={mailto(subject, body)}>{children ?? LINKS.email}</a>
}

export function WhatsAppLink({ text = 'Hi Blorbmart', children }: { text?: string; children?: ReactNode }) {
  return (
    <a href={whatsapp(text)} target="_blank" rel="noopener noreferrer">
      {children ?? WHATSAPP_NUMBER}
    </a>
  )
}

/** Who we are and how to reach us — the closing section of every legal page. */
export function CompanyDetails({ subject }: { subject: string }) {
  return (
    <ul>
      <li>
        <strong>{LEGAL.company}</strong>
        {LEGAL.rc && `, ${LEGAL.rc}`}
      </li>
      {LEGAL.address && <li>{LEGAL.address}</li>}
      <li>
        Email: <EmailLink subject={subject} />
      </li>
      <li>
        WhatsApp: <WhatsAppLink />
      </li>
    </ul>
  )
}

export function Table({ head, rows }: { head: [string, string]; rows: [ReactNode, ReactNode][] }) {
  return (
    <div className="overflow-x-auto rounded-2xl bg-white ring-1 ring-ink/[0.07] ring-inset">
      <table>
        <thead>
          <tr>
            <th scope="col">{head[0]}</th>
            <th scope="col">{head[1]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([a, b], i) => (
            <tr key={i}>
              <td>{a}</td>
              {/* The label stands in for the hidden header on phones. */}
              <td data-label={head[1]}>{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
