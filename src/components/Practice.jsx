// Practice screen: shown between the home page and the questionnaire.
// Teaches the "Leave site" quick exit before she shares anything.

function Pill({ children, className }) {
  return (
    <span className={`mx-0.5 inline-block rounded-md px-2 py-0.5 text-sm font-bold whitespace-nowrap ${className}`}>{children}</span>
  )
}

export default function Practice({ practiced, onTry, onSkip, onStart }) {
  if (practiced) {
    return (
      <div className="mx-auto max-w-xl animate-fade-up px-5 py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-700" aria-hidden="true">✓</div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">That’s how it works.</h1>
        <p className="mt-3 text-lg leading-relaxed text-slate-600">Your answers are just as you left them. Ready to start?</p>
        <button
          onClick={onStart}
          autoFocus
          className="mt-8 w-full rounded-xl bg-teal-600 px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-teal-600/20 transition hover:bg-teal-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-200"
        >
          Start →
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-xl animate-fade-up px-5 py-12">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md sm:p-8">
        <p className="text-sm font-semibold tracking-[0.2em] text-teal-700 uppercase">Practice</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Before you start, let’s practice leaving quickly.</h1>

        <ol className="mt-6 space-y-4 text-slate-700">
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-50 text-sm font-bold text-teal-700">1</span>
            <span className="leading-relaxed">
              If someone walks in, tap <Pill className="bg-rose-600 text-white">“Leave site”</Pill> in the top right corner. On a computer, you can also press Esc twice.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-50 text-sm font-bold text-teal-700">2</span>
            <span className="leading-relaxed">The screen will switch to a banana bread recipe. Your answers stay safe while it’s showing.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-50 text-sm font-bold text-teal-700">3</span>
            <span className="leading-relaxed">
              To come back, scroll down and tap <Pill className="bg-amber-700 text-white">“Print Recipe.”</Pill>
            </span>
          </li>
        </ol>

        <p className="mt-6 font-semibold text-slate-900">Try it now so you’ll know it works.</p>

        <div className="mt-5 grid gap-3">
          <button
            onClick={onTry}
            className="w-full rounded-xl bg-teal-600 px-6 py-4 text-lg font-semibold text-white shadow-lg shadow-teal-600/20 transition hover:bg-teal-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-200"
          >
            Try it now
          </button>
          <button
            onClick={onSkip}
            className="w-full rounded-xl px-6 py-3 font-medium text-slate-600 transition hover:bg-slate-100 hover:text-teal-700"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  )
}
