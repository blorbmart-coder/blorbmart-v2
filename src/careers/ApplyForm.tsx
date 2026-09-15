import { CircleCheck, Paperclip, TriangleAlert } from 'lucide-react'
import { useId, useRef, useState, type FormEvent } from 'react'
import { cx } from '../components/ui'
import { LINKS } from '../content'
import { careersApi, type Job } from './api'

const MAX_BYTES = 5 * 1024 * 1024
const ACCEPT = '.pdf,.doc,.docx'

const readAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('That file could not be read. Try choosing it again.'))
    reader.onload = () => resolve(String(reader.result))
    reader.readAsDataURL(file)
  })

const sizeLabel = (bytes: number) =>
  bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`

const FIELD =
  'min-h-13 w-full rounded-2xl bg-white px-4 text-base text-ink ring-1 ring-ink/[0.12] outline-none transition-[box-shadow,ring] placeholder:text-mute/60 focus-visible:ring-2 focus-visible:ring-iris'

function Label({ htmlFor, children, hint }: { htmlFor: string; children: string; hint?: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-bold text-ink">
      {children}
      {hint && <span className="ml-2 font-medium text-mute">{hint}</span>}
    </label>
  )
}

/**
 * One form for both paths in the spec: applying to a role, and the "nothing
 * here fits me" CV drop (FEAT-BM-004 §4). They ask for the same things, so
 * they are the same component — `job` only decides the wording and what the
 * application is tagged with.
 *
 * The CV goes up as base64 inside the JSON body. It means no multipart
 * handling on a backend that has none, and the file never lands anywhere but
 * Firestore, behind the admin console.
 */
export function ApplyForm({ job }: { job: Job | null }) {
  const id = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle')
  const [error, setError] = useState<string | null>(null)

  const fieldId = (name: string) => `${id}-${name}`

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)

    if (!file) {
      setError('Attach your CV as a PDF or Word document.')
      return
    }
    if (file.size > MAX_BYTES) {
      setError(`That file is ${sizeLabel(file.size)}. Please attach one under 5 MB.`)
      return
    }
    if (!/\.(pdf|docx?)$/i.test(file.name)) {
      setError('Your CV needs to be a PDF or a Word document (.pdf, .doc or .docx).')
      return
    }

    setState('sending')
    setError(null)
    try {
      const data = await readAsDataUrl(file)
      await careersApi.apply({
        jobId: job?.id ?? null,
        name: String(form.get('name') ?? ''),
        email: String(form.get('email') ?? ''),
        phone: String(form.get('phone') ?? ''),
        note: String(form.get('note') ?? ''),
        areaOfInterest: job ? '' : String(form.get('areaOfInterest') ?? ''),
        website: String(form.get('website') ?? ''),
        consent: true,
        cv: { name: file.name, data },
      })
      setState('done')
      formRef.current?.reset()
      setFile(null)
    } catch (submitError) {
      setState('idle')
      setError(submitError instanceof Error ? submitError.message : 'Something went wrong. Please try again.')
    }
  }

  if (state === 'done') {
    return (
      <div
        role="status"
        className="rounded-[2rem] bg-white p-7 ring-1 ring-ink/[0.07] ring-inset sm:p-10"
      >
        <p className="flex items-center gap-2.5 text-[0.7rem] font-extrabold tracking-[0.2em] text-iris uppercase">
          <CircleCheck className="h-4 w-4" aria-hidden="true" />
          Sent
        </p>
        <h3 className="mt-4 text-[clamp(1.5rem,2.6vw,2rem)] leading-tight font-extrabold tracking-[-0.02em]">
          {job ? `Your application is in.` : `Your CV is in.`}
        </h3>
        <p className="mt-3 max-w-lg leading-relaxed text-mute">
          We have emailed you a copy for your records. Somebody on the team reads every application, and if there is a
          fit we will reach out by email or phone. There is nothing else you need to do.
        </p>
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      onSubmit={submit}
      noValidate={false}
      className="rounded-[2rem] bg-white p-7 ring-1 ring-ink/[0.07] ring-inset sm:p-10"
    >
      <h3 className="text-[clamp(1.5rem,2.6vw,2rem)] leading-tight font-extrabold tracking-[-0.03em]">
        {job ? `Apply for ${job.title}` : 'Send us your CV'}
      </h3>
      <p className="mt-3 max-w-lg leading-relaxed text-mute">
        {job
          ? 'Tell us who you are and attach your CV. A short note about why this role interests you helps more than a cover letter.'
          : "Not seeing a role that fits? Send your CV anyway — we keep it on file and come back to it when something opens."}
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor={fieldId('name')}>Full name</Label>
          <input id={fieldId('name')} name="name" required autoComplete="name" className={FIELD} placeholder="Ada Okoro" />
        </div>
        <div>
          <Label htmlFor={fieldId('email')}>Email</Label>
          <input
            id={fieldId('email')}
            name="email"
            type="email"
            inputMode="email"
            required
            autoComplete="email"
            className={FIELD}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <Label htmlFor={fieldId('phone')} hint="optional">
            Phone
          </Label>
          <input
            id={fieldId('phone')}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={FIELD}
            placeholder="0902 259 4853"
          />
        </div>
        {!job && (
          <div>
            <Label htmlFor={fieldId('area')} hint="optional">
              What would you like to do?
            </Label>
            <input
              id={fieldId('area')}
              name="areaOfInterest"
              className={FIELD}
              placeholder="Operations, design, engineering…"
            />
          </div>
        )}
      </div>

      <div className="mt-5">
        <Label htmlFor={fieldId('note')} hint="optional">
          {job ? 'Why this role?' : 'Anything you want us to know'}
        </Label>
        <textarea
          id={fieldId('note')}
          name="note"
          rows={5}
          maxLength={3000}
          className={cx(FIELD, 'min-h-32 resize-y py-3.5 leading-relaxed')}
          placeholder={job ? 'A few lines are plenty.' : 'A link to your work is welcome too.'}
        />
      </div>

      {/* ── The CV ──────────────────────────────────────────────────────── */}
      <div className="mt-5">
        <Label htmlFor={fieldId('cv')} hint="PDF or Word, up to 5 MB">
          Your CV
        </Label>
        <label
          htmlFor={fieldId('cv')}
          className="flex min-h-13 cursor-pointer items-center gap-3 rounded-2xl bg-paper px-4 py-3 ring-1 ring-ink/[0.12] ring-inset transition-colors hover:bg-cream"
        >
          <Paperclip className="h-4.5 w-4.5 shrink-0 text-iris" aria-hidden="true" />
          <span className="min-w-0 flex-1 truncate font-semibold text-ink">
            {file ? file.name : 'Choose a file'}
          </span>
          <span className="shrink-0 text-sm font-semibold text-mute">{file ? sizeLabel(file.size) : 'Browse'}</span>
        </label>
        <input
          id={fieldId('cv')}
          name="cv"
          type="file"
          accept={ACCEPT}
          required
          className="sr-only"
          onChange={(event) => {
            setFile(event.target.files?.[0] ?? null)
            setError(null)
          }}
        />
      </div>

      {/* Bots fill this in; nobody else can see it. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={fieldId('website')}>Website</label>
        <input id={fieldId('website')} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-mute">
        <input
          name="consent"
          type="checkbox"
          required
          className="mt-0.5 h-5 w-5 shrink-0 rounded-md accent-iris"
        />
        <span>
          Blorbmart may keep my CV and details to consider me for this and future roles. I can ask for them to be
          deleted any time by emailing{' '}
          <a className="font-semibold text-iris-deep underline" href={`mailto:${LINKS.email}`}>
            {LINKS.email}
          </a>
          .
        </span>
      </label>

      {error && (
        <p role="alert" className="mt-5 flex items-start gap-2.5 rounded-2xl bg-ember/[0.08] px-4 py-3.5 font-semibold text-ember">
          <TriangleAlert className="mt-0.5 h-4.5 w-4.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'sending'}
        className="mt-7 inline-flex min-h-14 w-full items-center justify-center gap-2.5 rounded-full bg-iris px-7 font-bold text-white transition-[background-color,transform] duration-200 hover:bg-iris-deep active:scale-[0.98] disabled:opacity-60 sm:w-auto"
      >
        {state === 'sending' ? 'Sending…' : job ? 'Send application' : 'Send my CV'}
      </button>
      <p className="mt-3 text-sm text-mute">
        {state === 'sending' ? 'Uploading your CV — this can take a moment on a slow connection.' : 'We reply to every application.'}
      </p>
    </form>
  )
}
