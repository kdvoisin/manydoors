import { COUNTIES } from '../lib/geo.js'
import { CHILD_AGES, GENDERS, PET_TYPES, URGENCY_OPTIONS, missingAnswers } from '../lib/options.js'

function Question({ n, title, help, children }) {
  return (
    <fieldset className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <legend className="sr-only">{title}</legend>
      <div className="flex items-baseline gap-3">
        <span className="text-sm font-bold text-teal-600">{n}</span>
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      </div>
      <div className="mt-4">{children}</div>
      {help && <p className="mt-3 text-sm leading-relaxed text-slate-500">{help}</p>}
    </fieldset>
  )
}

function Choice({ on, onClick, children, className = '' }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${on ? 'border-teal-500 bg-teal-50 text-teal-900 ring-2 ring-teal-200' : 'border-slate-200 text-slate-700 hover:border-teal-300'} ${className}`}
    >
      {children}
    </button>
  )
}

const selectCls =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 focus:outline-none'

export default function Triage({ name, answers, setAnswers, onSubmit, loading, onBack }) {
  const set = (patch) => setAnswers((a) => ({ ...a, ...patch }))
  const display = name.trim()
  const missing = missingAnswers(answers)

  const setChild = (i, patch) =>
    setAnswers((a) => ({ ...a, children: a.children.map((c, j) => (j === i ? { ...c, ...patch } : c)) }))
  const addChild = () => setAnswers((a) => ({ ...a, children: [...a.children, { age: '', gender: '' }] }))
  const removeChild = (i) =>
    setAnswers((a) => {
      const children = a.children.filter((_, j) => j !== i)
      return { ...a, children, companions: children.length ? 'children' : null }
    })

  const bumpPet = (id, d) =>
    setAnswers((a) => ({ ...a, pets: { ...a.pets, [id]: Math.max(0, Math.min(9, a.pets[id] + d)) } }))

  return (
    <div className="mx-auto max-w-2xl animate-fade-up px-5 py-10">
      <button onClick={onBack} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm hover:border-teal-300 hover:text-teal-700">
        ← Back
      </button>
      <p className="mt-6 text-sm font-semibold tracking-[0.2em] text-teal-700 uppercase">{display ? `Welcome, ${display}` : 'Welcome'}</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Let’s find a safe place for your family.</h1>

      <form className="mt-8 space-y-5" onSubmit={(e) => { e.preventDefault(); if (!missing.length) onSubmit() }}>
        <Question n="01" title="Where are you right now?" help="County only — we never ask for an address">
          <select
            value={answers.county}
            onChange={(e) => set({ county: e.target.value })}
            aria-label="County"
            className={`${selectCls} rounded-xl px-4 py-3 ${answers.county ? '' : 'text-slate-400'}`}
          >
            <option value="" disabled>Select your county</option>
            {COUNTIES.map((c) => <option key={c} className="text-slate-900">{c}</option>)}
          </select>
        </Question>

        <Question n="02" title="Who is coming with you?">
          <div className="grid gap-2 sm:grid-cols-2">
            <Choice on={answers.companions === 'alone'} onClick={() => set({ companions: 'alone', children: [] })}>
              Just me
            </Choice>
            <Choice
              on={answers.companions === 'children'}
              onClick={() => set({ companions: 'children', children: answers.children.length ? answers.children : [{ age: '', gender: '' }] })}
            >
              Me and my child or children
            </Choice>
          </div>

          {answers.companions === 'children' && (
            <div className="mt-4 space-y-3 animate-fade-up">
              {answers.children.map((c, i) => (
                <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-700">Child {i + 1}</span>
                    <button type="button" onClick={() => removeChild(i)} className="text-xs text-slate-500 hover:text-rose-600">
                      Remove
                    </button>
                  </div>
                  <div className="mt-2 grid gap-3 sm:grid-cols-2">
                    <label className="block text-xs font-medium text-slate-600">
                      Age
                      <select
                        value={c.age}
                        onChange={(e) => setChild(i, { age: e.target.value === '' ? '' : Number(e.target.value) })}
                        className={`mt-1 ${selectCls} ${c.age === '' ? 'text-slate-400' : ''}`}
                      >
                        <option value="" disabled>Select age</option>
                        {CHILD_AGES.map((a) => (
                          <option key={a} value={a} className="text-slate-900">{a === 0 ? 'Under 1' : a}</option>
                        ))}
                      </select>
                    </label>
                    <div className="text-xs font-medium text-slate-600">
                      Gender
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        {GENDERS.map((g) => (
                          <button
                            type="button"
                            key={g.id}
                            aria-pressed={c.gender === g.id}
                            onClick={() => setChild(i, { gender: g.id })}
                            className={`rounded-full border px-3 py-2 text-xs font-medium transition ${c.gender === g.id ? 'border-teal-600 bg-teal-600 text-white' : 'border-slate-300 bg-white text-slate-700 hover:border-teal-400'}`}
                          >
                            {g.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {answers.children.length < 8 && (
                <button type="button" onClick={addChild} className="text-sm font-semibold text-teal-700 hover:text-teal-900">
                  + Add another child
                </button>
              )}
            </div>
          )}
        </Question>

        <Question
          n="03"
          title="Do you have pets you need to bring?"
          help="Many emergency shelters can’t take pets. We prioritize pet-inclusive options."
        >
          <div className="grid gap-2 sm:grid-cols-2">
            <Choice on={answers.hasPets === 'no'} onClick={() => set({ hasPets: 'no', pets: { dog: 0, cat: 0, other: 0 } })}>
              No pets
            </Choice>
            <Choice on={answers.hasPets === 'yes'} onClick={() => set({ hasPets: 'yes' })}>
              Yes, I have pets
            </Choice>
          </div>

          {answers.hasPets === 'yes' && (
            <div className="mt-4 grid animate-fade-up gap-2 sm:grid-cols-3">
              {PET_TYPES.map((t) => {
                const n = answers.pets[t.id]
                return (
                  <div key={t.id} className={`flex items-center justify-between rounded-xl border px-3 py-2.5 ${n ? 'border-teal-400 bg-teal-50' : 'border-slate-200'}`}>
                    <span className="text-sm font-medium text-slate-800"><span aria-hidden="true">{t.icon}</span> {t.label}</span>
                    <span className="flex items-center gap-2">
                      <button type="button" aria-label={`One fewer ${t.label}`} onClick={() => bumpPet(t.id, -1)} disabled={!n}
                        className="h-7 w-7 rounded-full border border-slate-300 bg-white text-slate-700 disabled:opacity-30">−</button>
                      <span className="w-4 text-center font-semibold tabular-nums" aria-live="polite">{n}</span>
                      <button type="button" aria-label={`One more ${t.label}`} onClick={() => bumpPet(t.id, 1)}
                        className="h-7 w-7 rounded-full border border-teal-500 bg-white text-teal-700 hover:bg-teal-50">+</button>
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </Question>

        <Question n="04" title="How soon do you need help?">
          <div className="space-y-2">
            {URGENCY_OPTIONS.map((o) => {
              const on = answers.urgency === o.id
              return (
                <button
                  type="button"
                  key={o.id}
                  aria-pressed={on}
                  onClick={() => set({ urgency: o.id })}
                  className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${on ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-200' : 'border-slate-200 hover:border-teal-300'}`}
                >
                  <span className="text-2xl" aria-hidden="true">{o.icon}</span>
                  <span className="flex-1">
                    <span className="block font-semibold text-slate-900">{o.title}</span>
                    <span className="block text-sm text-slate-500">{o.sub}</span>
                  </span>
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${on ? 'border-teal-600 bg-teal-600' : 'border-slate-300'}`}>
                    {on && <span className="h-2 w-2 rounded-full bg-white" />}
                  </span>
                </button>
              )
            })}
          </div>
        </Question>

        <button
          type="submit"
          disabled={loading || missing.length > 0}
          className={`w-full rounded-xl bg-teal-600 px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-teal-600/20 transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none ${loading ? 'animate-soft-pulse disabled:cursor-wait disabled:bg-teal-600' : ''}`}
        >
          {loading ? 'Checking shelter criteria…' : 'Find my matches'}
        </button>
        {missing.length > 0 && (
          <p className="text-center text-sm text-slate-500">Still needed: {missing.join(', ')}.</p>
        )}
      </form>
    </div>
  )
}
