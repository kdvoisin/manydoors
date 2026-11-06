import { useState } from 'react'

const INGREDIENTS = [
  '½ cup (113 g) unsalted butter',
  '3 very ripe bananas, well mashed (about 1½ cups)',
  '¾ cup (150 g) packed light brown sugar',
  '2 large eggs, room temperature',
  '⅓ cup (80 g) sour cream or plain yogurt',
  '1 tsp pure vanilla extract',
  '1¾ cups (220 g) all-purpose flour',
  '1 tsp baking soda',
  '½ tsp fine sea salt',
  '½ tsp ground cinnamon',
  '½ cup toasted walnuts, chopped (optional)',
]

const STEPS = [
  'Preheat the oven to 350°F (175°C). Grease a 9×5-inch loaf pan and line it with a parchment sling.',
  'Melt the butter in a light-colored saucepan over medium heat. Keep swirling until the milk solids turn golden brown and smell nutty, about 5 minutes. Pour into a large bowl right away and let cool for 10 minutes.',
  'Whisk the brown sugar into the browned butter, then add the eggs, sour cream, vanilla, and mashed bananas. Whisk until smooth.',
  'In a separate bowl, whisk together the flour, baking soda, salt, and cinnamon. Fold into the wet ingredients until just combined. A few streaks of flour are fine. Fold in the walnuts.',
  'Scrape the batter into the pan. Bake 55–65 minutes, until a toothpick in the center comes out with a few moist crumbs.',
  'Cool in the pan for 15 minutes, then lift out and cool on a rack. (It’s even better the next day!)',
]

export default function Decoy({ onReturn }) {
  const [saved, setSaved] = useState(false)

  return (
    <div className="min-h-screen bg-[#fbf8f3] font-serif text-stone-800">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <div>
            <div className="text-2xl font-bold tracking-tight text-stone-900">The Daily Apron</div>
            <div className="font-sans text-xs uppercase tracking-[0.2em] text-stone-500">Home cooking, from our table to yours</div>
          </div>
          <nav className="hidden gap-6 font-sans text-sm text-stone-600 md:flex">
            <span>Recipes</span><span>Baking</span><span>Weeknight</span><span>Holidays</span><span>About</span>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-10">
        <p className="font-sans text-xs uppercase tracking-widest text-amber-700">Baking · Quick Breads</p>
        <h1 className="mt-2 text-4xl leading-tight font-bold text-stone-900 sm:text-5xl">
          Grandma’s Moist Brown Butter Banana Bread
        </h1>
        <p className="mt-3 font-sans text-sm text-stone-500">By Margaret Ellison · Updated March 14 · 4.9 ★ (2,318 ratings)</p>
        <button
          onClick={() => document.getElementById('recipe-card')?.scrollIntoView({ behavior: 'smooth' })}
          className="mt-4 rounded-full bg-amber-700 px-5 py-2 font-sans text-sm font-semibold text-white shadow hover:bg-amber-800"
        >
          ↓ Jump to Recipe
        </button>

        <div className="mt-6 flex aspect-[16/9] items-center justify-center rounded-lg bg-gradient-to-br from-amber-200 via-amber-300 to-amber-700 text-8xl shadow-inner" aria-hidden="true">
          🍞🍌
        </div>

        <p className="mt-8 text-lg leading-relaxed">
          Every Sunday my grandmother kept a bunch of speckled bananas on the windowsill “for the bread.” Her secret was browning the butter first, which gives every slice a deep, toffee-like flavor. This is the loaf my family asks for at every holiday. It’s tender, it’s cozy, and it’s impossible to mess up.
        </p>
        <p className="mt-4 text-lg leading-relaxed">
          The riper the bananas, the better: look for skins that are more brown than yellow. A spoonful of sour cream keeps it moist for days, if it lasts that long.
        </p>

        <section id="recipe-card" className="mt-10 scroll-mt-6 rounded-xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-stone-900">Brown Butter Banana Bread</h2>
              <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 font-sans text-sm text-stone-600">
                <span><b>Prep:</b> 15 min</span>
                <span><b>Bake:</b> 1 hr</span>
                <span><b>Yield:</b> 1 loaf (10 slices)</span>
              </div>
            </div>
            <div className="flex shrink-0 gap-2 font-sans">
              <button
                onClick={onReturn}
                className="rounded-md bg-amber-700 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-amber-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
              >
                🖨️ Print Recipe
              </button>
              <button
                onClick={() => setSaved(true)}
                className="rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-50"
              >
                {saved ? '✓ Saved' : '🔖 Save to Box'}
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-[1fr_1.4fr]">
            <div>
              <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-amber-800">Ingredients</h3>
              <ul className="mt-3 space-y-2">
                {INGREDIENTS.map((i) => (
                  <li key={i} className="flex gap-2"><span className="text-amber-600">•</span>{i}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-amber-800">Instructions</h3>
              <ol className="mt-3 space-y-4">
                {STEPS.map((s, n) => (
                  <li key={n} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 font-sans text-sm font-bold text-amber-800">{n + 1}</span>
                    <span className="leading-relaxed">{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-lg bg-amber-50 p-6">
          <h3 className="text-xl font-bold">Margaret’s tips</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
            <li>Freeze overripe bananas in their peels. Thaw them and use the juices too.</li>
            <li>Sprinkle the top with turbinado sugar before baking for a crackly crust.</li>
            <li>Wrapped tightly, the loaf keeps 3 days on the counter or 3 months in the freezer.</li>
          </ul>
        </section>
      </main>

      <footer className="border-t border-stone-200 bg-white py-8 text-center font-sans text-xs text-stone-500">
        © The Daily Apron · Recipes · Newsletter · Privacy
      </footer>
    </div>
  )
}
