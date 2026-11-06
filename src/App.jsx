import { useCallback, useEffect, useRef, useState } from 'react'
import Home from './components/Home.jsx'
import Triage from './components/Triage.jsx'
import Results from './components/Results.jsx'
import Decoy from './components/Decoy.jsx'
import { EMPTY_ANSWERS } from './lib/options.js'

// Plain, neutral tab title so browser history doesn't describe the service.
const APP_TITLE = 'Home'
const DECOY_TITLE = "Grandma's Banana Bread Recipe - The Daily Apron"
const DOUBLE_TAP_MS = 600
const icon = (emoji) => `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>${emoji}</text></svg>`
const APP_ICON = icon('🚪')
const DECOY_ICON = icon('🍞')


// Privacy: all state lives in React memory only. Nothing is written to
// localStorage, sessionStorage, or cookies.
export default function App() {
  const [screen, setScreen] = useState('home')
  const [name, setName] = useState('')
  const [answers, setAnswers] = useState(EMPTY_ANSWERS)
  const [loading, setLoading] = useState(false)
  const [decoy, setDecoy] = useState(false)
  const [practiced, setPracticed] = useState(false)

  const lastEsc = useRef(0)
  const savedScroll = useRef(0)
  const wasDecoy = useRef(false)

  const toggleDecoy = useCallback((on) => {
    setDecoy((current) => {
      const next = typeof on === 'boolean' ? on : !current
      if (next === current) return current
      if (next) {
        savedScroll.current = window.scrollY
        document.activeElement?.blur?.()
      }
      return next
    })
  }, [])

  // Keep the tab title and scroll position in sync with the decoy state.
  useEffect(() => {
    document.title = decoy ? DECOY_TITLE : APP_TITLE
    document.getElementById('favicon')?.setAttribute('href', decoy ? DECOY_ICON : APP_ICON)
    window.scrollTo(0, decoy ? 0 : savedScroll.current)
    // Coming back from the recipe while on the home page = practice done.
    if (wasDecoy.current && !decoy && screen === 'home') setPracticed(true)
    wasDecoy.current = decoy
  }, [decoy]) // eslint-disable-line react-hooks/exhaustive-deps

  // Double-tap Escape toggles the decoy.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      const now = Date.now()
      if (now - lastEsc.current < DOUBLE_TAP_MS) {
        lastEsc.current = 0
        toggleDecoy()
      } else {
        lastEsc.current = now
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toggleDecoy])

  const go = (s) => {
    setScreen(s)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const findMatches = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      go('results')
    }, 1000)
  }

  const restart = () => {
    setName('')
    setAnswers(EMPTY_ANSWERS)
    setPracticed(false)
    go('home')
  }

  return (
    <>
      {decoy && <Decoy onReturn={() => toggleDecoy(false)} />}

      {/* The app stays mounted (just hidden) while the decoy shows, so nothing is lost. */}
      <div hidden={decoy} className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-teal-50/40 text-slate-800">
        <div className="sticky top-0 z-50 bg-rose-600 text-white shadow-md">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-5 py-2">
            <p className="text-xs sm:text-sm">
              <span className="font-semibold">In immediate danger? Call 911.</span>
              <span className="hidden sm:inline"> · Need to hide this page fast?</span>
            </p>
            <div className="flex items-center gap-3">
              <span className="hidden text-xs text-rose-100 sm:inline">or press Esc twice</span>
              <button
                onClick={() => toggleDecoy(true)}
                className="rounded-lg bg-white px-4 py-1.5 text-sm font-bold text-rose-700 shadow transition hover:bg-rose-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-300"
              >
                ✕ Quick Exit
              </button>
            </div>
          </div>
        </div>

        <header className="border-b border-slate-200/70 bg-white/80 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-5 py-4">
            <button onClick={() => go('home')} className="flex items-center gap-3 text-left" aria-label="Many Doors home">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 text-white shadow" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 21V4a1 1 0 0 1 1-1h6v18" /><path d="M13 21V3h6a1 1 0 0 1 1 1v17" />
                  <circle cx="9" cy="12" r=".9" fill="currentColor" /><circle cx="15" cy="12" r=".9" fill="currentColor" />
                  <path d="M2 21h20" />
                </svg>
              </span>
              <span>
                <span className="block text-xl font-bold tracking-tight text-slate-900">Many Doors</span>
                <span className="block text-xs text-slate-500">Tell your story once. Find the doors that open.</span>
              </span>
            </button>
            <button
              onClick={restart}
              className="shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 underline-offset-4 hover:bg-slate-100 hover:text-teal-700"
            >
              ↺ Start over
            </button>
          </div>
        </header>

        <main key={screen}>
          {screen === 'home' && (
            <Home
              name={name}
              setName={setName}
              onBegin={() => go('triage')}
              onTryExit={() => toggleDecoy(true)}
              practiced={practiced}
            />
          )}
          {screen === 'triage' && (
            <Triage
              name={name}
              answers={answers}
              setAnswers={setAnswers}
              loading={loading}
              onSubmit={findMatches}
              onBack={() => go('home')}
            />
          )}
          {screen === 'results' && (
            <Results name={name} answers={answers} onBack={() => go('triage')} onRestart={restart} />
          )}
        </main>

        <footer className="mt-10 border-t border-slate-200 py-8 text-center text-xs text-slate-500">
          Many Doors demo · Shelter info from the SAF-T Program directory and DomesticShelters.org · Nothing you enter is stored or sent anywhere
        </footer>
      </div>
    </>
  )
}
