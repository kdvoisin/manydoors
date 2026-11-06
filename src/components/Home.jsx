const BADGES = [
  { icon: '🔒', title: 'Nothing saved', text: 'No accounts, no tracking. Your answers stay on this screen and disappear when you close this page.' },
  { icon: '📍', title: 'Only what’s needed', text: 'Your county, who’s coming with you, and what you need. Never your address.' },
  { icon: '🚪', title: 'Quick Exit', text: 'Hide this screen in one tap, anytime.' },
]

export default function Home({ name, setName, onBegin, onTryExit, practiced }) {
  return (
    <div className="animate-fade-up">
      <section className="mx-auto max-w-3xl px-5 pt-12 pb-8 text-center sm:pt-20">
        <h1 className="text-4xl leading-tight font-bold tracking-tight text-slate-900 sm:text-5xl">
          Find safe shelter without telling your story over and over.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
          Navigating shelter rules and eligibility during a crisis is overwhelming. Many Doors evaluates facility criteria so you only tell your story once.
        </p>
      </section>

      <section className="mx-auto grid max-w-5xl gap-4 px-5 sm:grid-cols-3">
        {BADGES.map((b) => (
          <div key={b.title} className="rounded-2xl border border-teal-100 bg-white p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-xl" aria-hidden="true">{b.icon}</div>
            <h2 className="mt-3 font-semibold text-slate-900">{b.title}</h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">{b.text}</p>
          </div>
        ))}
      </section>

      <div className="mx-auto mt-4 max-w-5xl space-y-1 px-5 text-center text-xs leading-relaxed text-slate-500">
        <p>For extra privacy, open this site in a private or incognito window. It won’t appear in your browser history.</p>
        <p>Results draw from established national directories of domestic violence shelters: the SAF-T Program and DomesticShelters.org.</p>
      </div>

      <section className="mx-auto mt-6 max-w-5xl px-5" aria-labelledby="try-exit">
        <div className="rounded-2xl border border-teal-200 bg-teal-50 p-6 sm:p-8">
          <h2 id="try-exit" className="text-xl font-bold text-teal-950">Try Quick Exit before you start</h2>
          <p className="mt-2 max-w-3xl leading-relaxed text-teal-900/90">
            If someone walks in, tap “Quick Exit” in the top right corner, or press Esc twice on a computer. The screen switches to a banana bread recipe. To come back, scroll down and tap “Print Recipe.”
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={onTryExit}
              className="rounded-xl bg-white px-5 py-3 font-semibold text-teal-800 shadow-sm ring-1 ring-teal-300 transition hover:bg-teal-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-300"
            >
              Try Quick Exit now
            </button>
            {practiced && (
              <p role="status" className="animate-fade-up text-sm font-semibold text-emerald-800">
                ✓ That’s how it works. Your answers are just as you left them.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-xl px-5 py-12">
        <form
          onSubmit={(e) => { e.preventDefault(); onBegin() }}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md sm:p-8"
        >
          <label htmlFor="name" className="block text-lg font-semibold text-slate-900">What should we call you?</label>
          <p id="name-help" className="mt-1 text-sm text-slate-500">A first name or nickname is fine — whatever feels safe.</p>
          <input
            id="name"
            aria-describedby="name-help"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="First name or nickname"
            className="mt-4 w-full rounded-xl border border-slate-300 px-4 py-3 text-lg text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 focus:outline-none"
          />
          <button
            type="submit"
            className="mt-5 w-full rounded-xl bg-teal-600 px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-teal-600/20 transition hover:bg-teal-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-200"
          >
            Start →
          </button>
        </form>
      </section>
    </div>
  )
}
