import RESOURCES from '../data/resources.json'
import { petCount, callQuestions } from './options.js'
import { COUNTY_CENTERS, CITY_COORDS, miles } from './geo.js'

const short = (c) => c.replace(', TX', '')

/**
 * Ranks shelters for a person's answers:
 *   1. serves their county  2. pets confirmed  3. distance
 * Each result carries the reasons behind its ranking.
 */
export function rankShelters(answers, resources = RESOURCES) {
  const hasPet = petCount(answers) > 0
  const home = COUNTY_CENTERS[answers.county]

  const results = resources.map((s) => {
    const servesCounty = s.countiesServed.includes(answers.county)
    const petsConfirmed = s.acceptsPets === true
    const coords = CITY_COORDS[s.city]
    const distance = home && coords ? Math.round(miles(home, coords)) : null

    const reasons = [
      servesCounty
        ? { ok: true, text: `Serves ${short(answers.county)}` }
        : { ok: false, text: `Serves ${s.countiesServed.map(short).join(' and ')}, outside your area` },
    ]
    if (hasPet) {
      if (s.listedInSaft) reasons.push({ ok: true, text: 'Pets accepted (SAF-T Program directory)' })
      if (!petsConfirmed) reasons.push({ ok: null, text: 'Pets not confirmed' })
      if (petsConfirmed && s.petDetails)
        reasons.push({ ok: true, text: `${s.petDetails} (${s.otherDetailsSource.name})` })
    }
    if (distance != null)
      reasons.push({ ok: 'info', text: `About ${distance} miles from the center of ${short(answers.county)}` })

    const likelyFit = servesCounty && (petsConfirmed || !hasPet)
    return { shelter: s, servesCounty, petsConfirmed, distance, reasons, ask: callQuestions(answers, s), likelyFit }
  })

  results.sort(
    (a, b) =>
      Number(b.servesCounty) - Number(a.servesCounty) ||
      (hasPet ? Number(b.petsConfirmed) - Number(a.petsConfirmed) : 0) ||
      (a.distance ?? Infinity) - (b.distance ?? Infinity),
  )
  return results
}
