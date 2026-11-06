export const EMPTY_ANSWERS = {
  county: '',
  companions: null, // 'alone' | 'children'
  children: [], // [{ age: '' | number, gender: '' | 'girl' | 'boy' | 'unspecified' }]
  hasPets: null, // 'no' | 'yes'
  pets: { dog: 0, cat: 0, other: 0 },
  urgency: null, // 'today' | 'days' | 'future'
}

export const GENDERS = [
  { id: 'girl', label: 'Girl', noun: 'daughter' },
  { id: 'boy', label: 'Boy', noun: 'son' },
  { id: 'unspecified', label: 'Prefer not to say', noun: 'child' },
]

export const PET_TYPES = [
  { id: 'dog', label: 'Dog', icon: '🐕', one: 'dog', many: 'dogs' },
  { id: 'cat', label: 'Cat', icon: '🐈', one: 'cat', many: 'cats' },
  { id: 'other', label: 'Other', icon: '🐾', one: 'pet', many: 'pets' },
]

export const URGENCY_OPTIONS = [
  { id: 'today', title: 'I need somewhere to go today or tonight', sub: 'We’ll help you ask about space today', icon: '🌙' },
  { id: 'days', title: 'Within the next few days', sub: 'Planning a safe window', icon: '🗓️' },
  { id: 'future', title: 'Gathering information for the future', sub: 'No pressure — just exploring options', icon: '🧭' },
]

export const CHILD_AGES = Array.from({ length: 18 }, (_, i) => i) // 0–17

// ── Helpers derived from answers ─────────────────────────────────────────────

export const kids = (a) => (a.companions === 'children' ? a.children : [])
export const petCount = (a) => (a.hasPets === 'yes' ? a.pets.dog + a.pets.cat + a.pets.other : 0)

const ageLabel = (age) =>
  age === 0 ? 'an infant' : `${age === 8 || age === 11 ? 'an' : 'a'} ${age}-year-old`

/** Phrase like "your child" / "your 2 children" / "your dog" / "your pets". */
export function companionPhrases(a) {
  const out = []
  const k = kids(a)
  if (k.length === 1) out.push('your child')
  if (k.length > 1) out.push(`your ${k.length} children`)
  const n = petCount(a)
  if (n > 0) {
    const types = PET_TYPES.filter((t) => a.pets[t.id] > 0)
    if (types.length === 1) {
      const t = types[0]
      out.push(n === 1 ? `your ${t.one}` : `your ${n} ${t.many}`)
    } else out.push('your pets')
  }
  return out
}

/**
 * "What to ask when you call" questions, built from her answers.
 * If a shelter houses pets off-site, the pet question asks where they'd stay.
 */
export function callQuestions(a, shelter = {}) {
  const offSite = shelter.petHousing === 'off-site'
  const q = []
  if (a.urgency === 'today') q.push('Do you have space today?')
  if (a.urgency === 'days') q.push('Will you have space in the next few days?')
  if (a.urgency === 'future') q.push('How does intake work when I’m ready?')

  for (const c of kids(a)) {
    const g = GENDERS.find((x) => x.id === c.gender)
    if (c.age === 0) q.push(`Do you accept an infant${g && g.id !== 'unspecified' ? ` ${g.noun}` : ''}?`)
    else q.push(`Do you accept ${ageLabel(c.age)} ${g ? g.noun : 'child'}?`)
  }

  for (const t of PET_TYPES) {
    const n = a.hasPets === 'yes' ? a.pets[t.id] : 0
    if (!n) continue
    const what = n === 1 ? `my ${t.one}` : `my ${n} ${t.many}`
    const note = t.id === 'other' ? (n === 1 ? ' (not a dog or cat)' : ' (not dogs or cats)') : ''
    q.push(offSite ? `Where would ${what} stay, and can I visit?${note}` : `Can I bring ${what}?${note}`)
  }
  return q
}

/** What's still missing before matches can be shown. Empty list = ready. */
export function missingAnswers(a) {
  const m = []
  if (!a.county) m.push('your county')
  if (!a.companions) m.push('who is coming with you')
  else if (a.companions === 'children' && (a.children.length === 0 || a.children.some((c) => c.age === '' || !c.gender)))
    m.push('each child’s age and gender')
  if (!a.hasPets) m.push('whether you have pets')
  else if (a.hasPets === 'yes' && petCount(a) === 0) m.push('what kind of pet')
  if (!a.urgency) m.push('how soon you need help')
  return m
}
