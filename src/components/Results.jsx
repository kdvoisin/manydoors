import { useMemo, useState } from 'react'
import { rankShelters } from '../lib/match.js'
import { companionPhrases, petCount } from '../lib/options.js'

const fmtDate = (iso) =>
  new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const joinList = (xs) =>
  xs.length > 1 ? `${xs.slice(0, -1).join(', ')}${xs.length > 2 ? ',' : ''} and ${xs.at(-1)}` : xs[0]

function ComingSoon() {
  return (
    <span className="ml-2 rounded-full bg-slate-200 px-2 py-0.5 text-[11px] font-bold tracking-wide text-slate-600 uppercase">
      Coming soon
    </span>
  )
}

function ReasonIcon({ ok }) {
  if (ok === 'info')
    return <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center text-sm" aria-hidden="true">📍</span>
  if (ok === true)
    return <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">✓</span>
  if (ok === false)
    return <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-400 text-xs font-bold text-white">↗</span>
  return <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-amber-400 text-[10px] font-bold text-amber-600">?</span>
}

function SourceLine({ shelter }) {
  const link = 'font-medium text-teal-700 underline underline-offset-2 hover:text-teal-900'
  return (
    <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
      <span>Pet info: <a href={shelter.petInfoSource.url} target="_blank" rel="noreferrer noopener" className={link}>{shelter.petInfoSource.name}</a></span>
      <span>Other details: <a href={shelter.otherDetailsSource.url} target="_blank" rel="noreferrer noopener" className={link}>{shelter.otherDetailsSource.name}</a></span>
      <span>Last verified {fmtDate(shelter.lastVerified)}</span>
    </p>
  )
}

/** Tap-to-call button plus the "What to ask when you call" list. */
function CallBlock({ shelter, ask }) {
  return (
    <div className="mt-5 rounded-xl border border-teal-100 bg-teal-50/50 p-4">
      {shelter.phone ? (
        <a
          href={`tel:${shelter.phone.replace(/\D/g, '')}`}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white shadow transition hover:bg-teal-700"
        >
          📞 Call {shelter.phone}
          {shelter.phoneLabel && <span className="font-normal text-teal-50">· {shelter.phoneLabel}</span>}
        </a>
      ) : (
        <p className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-3 text-center text-sm text-slate-500">
          Phone number not yet verified
        </p>
      )}
      {ask.length > 0 && (
        <>
          <h4 className="mt-4 text-xs font-bold tracking-wider text-slate-500 uppercase">What to ask when you call</h4>
          <ul className="mt-2 space-y-1.5 text-sm text-slate-800">
            {ask.map((q) => (
              <li key={q} className="flex gap-2"><span className="text-teal-600" aria-hidden="true">☐</span>{q}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default function Results({ name, answers, onBack, onRestart }) {
  const display = name.trim()
  const ranked = useMemo(() => rankShelters(answers), [answers])
  const [showPin, setShowPin] = useState(false)
  const [top, ...others] = ranked

  const callout = (() => {
    if (!top.likelyFit) return null
    const facts = [`serves ${answers.county.replace(', TX', '')}`]
    const hasPet = petCount(answers) > 0
    if (hasPet && top.shelter.listedInSaft) facts.push('is listed by the SAF-T Program as accepting pets')
    if (hasPet && top.petsConfirmed && top.shelter.petDetails)
      facts.push(`is listed by ${top.shelter.otherDetailsSource.name} as having an ${top.shelter.petDetails.toLowerCase()}`)
    const phrases = companionPhrases(answers)
    // Pets are always the last phrase when present.
    const petPhrase = hasPet ? phrases.at(-1) : null
    const offSite = hasPet && top.shelter.petHousing === 'off-site'
    const together = offSite ? phrases.slice(0, -1) : phrases
    const who = together.length ? joinList(['you', ...together]) : null
    let end = who ? `, so ${who} may be able to stay together` : ''
    if (offSite) end += who ? `, and ${petPhrase} may have a safe place to stay` : `, so ${petPhrase} may have a safe place to stay`
    return `${top.shelter.name} ${joinList(facts)}${end}.`
  })()

  return (
    <div className="mx-auto max-w-3xl animate-fade-up px-5 py-10">
      <button onClick={onBack} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm hover:border-teal-300 hover:text-teal-700">
        ← Back
      </button>
      <p className="mt-6 text-sm font-semibold tracking-[0.2em] text-teal-700 uppercase">{display ? `Your matches, ${display}` : 'Your matches'}</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {top.likelyFit ? 'We found a place that looks like a good fit.' : 'Here are the closest options we know about.'}
      </h1>
      <p className="mt-2 text-sm text-slate-500">Ranked by: serves your county → pets confirmed → distance.</p>
      <p className="mt-1 text-sm text-slate-500">
        Shelter information comes from established national directories: the SAF-T Program (pet-friendly shelters) and DomesticShelters.org (a national directory of U.S. and Canadian domestic violence programs).
      </p>

      {/* Top result */}
      <article className={`mt-6 overflow-hidden rounded-2xl border-2 bg-white shadow-lg ${top.likelyFit ? 'border-emerald-200 shadow-emerald-900/5' : 'border-slate-200'}`}>
        <div className={`border-b px-6 py-5 ${top.likelyFit ? 'border-emerald-100 bg-gradient-to-r from-emerald-50 to-teal-50' : 'border-slate-100 bg-slate-50'}`}>
          <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${top.likelyFit ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
            {top.likelyFit ? '✓ Likely fit' : 'Closest option'}
          </span>
          <h2 className="mt-3 text-2xl font-bold text-slate-900">{top.shelter.name}</h2>
          <p className="mt-1 text-sm text-slate-600">{top.shelter.city}, TX</p>
        </div>

        <div className="px-6 py-5">
          <h3 className="text-sm font-bold tracking-wider text-slate-500 uppercase">Why it’s ranked here</h3>
          <ul className="mt-3 space-y-2">
            {top.reasons.map((r) => (
              <li key={r.text} className={`flex items-start gap-3 rounded-lg px-3 py-2 text-slate-800 ${r.ok === true ? 'bg-emerald-50/70' : 'bg-slate-50'}`}>
                <ReasonIcon ok={r.ok} />
                {r.text}
              </li>
            ))}
          </ul>

          {callout && (
            <div className="mt-5 rounded-xl border-l-4 border-teal-500 bg-teal-50 p-4">
              <p className="font-semibold text-teal-900">{display ? `Why ${display} may qualify` : 'Why you may qualify'}</p>
              <p className="mt-1 text-sm leading-relaxed text-teal-900/80">{callout}</p>
            </div>
          )}

          <CallBlock shelter={top.shelter} ask={top.ask} />
          <SourceLine shelter={top.shelter} />

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              onClick={() => setShowPin((v) => !v)}
              aria-expanded={showPin}
              className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-left text-sm font-semibold text-slate-600 transition hover:border-slate-400"
            >
              🔑 Save for Later (Secret Memory PIN)<ComingSoon />
            </button>
            <button disabled title="Coming soon" className="cursor-not-allowed rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-left text-sm font-semibold text-slate-500">
              📞 Call via Stealth Dial<ComingSoon />
            </button>
          </div>

          {showPin && (
            <div className="mt-3 animate-fade-up rounded-xl border border-dashed border-slate-300 bg-white p-5">
              <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">Preview — this feature is not working yet</p>
              <p className="mt-3 text-center font-mono text-2xl font-bold tracking-widest text-slate-800">BREAD • BLUE • RIVER • 84</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                When it’s ready: no accounts or device history needed. Whenever you are safe to leave, you’ll enter a 4-word key like this on any device to get your plan back. <b>Your plan is not being saved right now.</b>
              </p>
            </div>
          )}
        </div>
      </article>

      {/* Other results */}
      {others.length > 0 && (
        <section className="mt-8">
          <h2 className="text-sm font-bold tracking-wider text-slate-500 uppercase">Other options</h2>
          <div className="mt-3 space-y-3">
            {others.map((r) => (
              <article key={r.shelter.name} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-slate-900">{r.shelter.name}</h3>
                  {r.likelyFit && <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">Likely fit</span>}
                  {!r.petsConfirmed && petCount(answers) > 0 && (
                    <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800">Pets not confirmed</span>
                  )}
                </div>
                <p className="mt-1 text-sm text-slate-600">{r.shelter.city}, TX</p>
                <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
                  {r.reasons.map((x) => (
                    <li key={x.text} className="flex items-start gap-2"><ReasonIcon ok={x.ok} />{x.text}</li>
                  ))}
                </ul>
                <CallBlock shelter={r.shelter} ask={r.ask} />
                <SourceLine shelter={r.shelter} />
              </article>
            ))}
          </div>
        </section>
      )}

      <p className="mt-8 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm font-semibold text-amber-900">
        Pet policies change. Always call to confirm.
      </p>

      <div className="mt-8 text-center">
        <button onClick={onRestart} className="text-sm text-slate-500 underline-offset-4 hover:text-teal-700 hover:underline">
          Start over and clear my answers
        </button>
      </div>
    </div>
  )
}
