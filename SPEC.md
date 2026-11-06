# Many Doors — Final Spec

A modern, responsive single-page web app built with **React** and **Tailwind CSS**.

> **Changes applied to the original request**
> 1. "100% Verified Match" is replaced with **"Likely fit"**, and every result card shows the reasons for its ranking.
> 2. **Real organizations only.** All shelter data lives in `src/data/resources.json` (see §5).
> 3. Pet info comes from the **SAF-T Program directory** (https://saftprogram.org/shelters/). Other details come from **DomesticShelters.org**.
> 4. **No pre-filled demo data.** Every field starts empty and nothing is pre-selected. No child or pet names are ever asked for or shown. The only name used is the one she enters.
> 5. **No statistics** appear on any screen.
> 6. **"Save for Later"** and **"Stealth Dial"** appear as clearly labeled **"Coming soon"** features.
> 7. No mention of Austin Pets Alive!, and **no claim that any shelter rejects pets**.
> 8. The anonymized intake packet is **removed**. Each result card instead has a tap-to-call phone link and a "What to ask when you call" list.
> 9. **Navigation:** "Start over" in the header on every screen, plus "Back" on the questionnaire and results screens. Starting over clears all answers.
> 10. **Quick Exit practice lives on the home page**, in a highlighted "Try Quick Exit before you start" section below the three cards. (The separate practice screen was removed.)

---

## 1. Branding & safety

- **Brand:** "Many Doors". Tagline: "Tell your story once. Find the doors that open."
- **Browser tab title:** plain and neutral: **"Home"**, so browser history doesn't describe the service. The Many Doors name and tagline appear on the page itself (header).

- **Header:** logo/brand on the left (returns to the homepage) and a **"↺ Start over"** link on the right, on every screen. Start over clears the name and all answers and returns to the homepage.
- **Top emergency bar (sticky):** red bar with a **"Quick Exit"** button in the top right corner with the subtext "or press Esc twice".
- **Decoy shield:**
  - Pressing `Escape` twice quickly OR clicking "Quick Exit" immediately hides the whole app. It is replaced by a realistic cooking blog article, "Grandma's Moist Brown Butter Banana Bread", from "The Daily Apron".
  - The browser tab title changes to "Grandma's Banana Bread Recipe - The Daily Apron".
  - The recipe card has a primary button **"🖨️ Print Recipe"** and a secondary button **"🔖 Save to Box"**.
  - **Secret return:** clicking "Print Recipe" (or pressing `Escape` twice again) restores the user's session with **zero data loss**.
  - **Privacy:** nothing is saved to localStorage, sessionStorage, or cookies. All state lives in React memory only.
  - **No outside servers:** the app loads no web fonts, analytics, or CDN files; everything comes from the app itself. The only outside addresses are the source links on result cards, which open only if tapped.

## 2. Screen 1 — Homepage (trust & entry)

- **Headline:** "Find safe shelter without telling your story over and over."
- **Subhead:** "Navigating shelter rules and eligibility during a crisis is overwhelming. Many Doors evaluates facility criteria so you only tell your story once."
- **Three cards:**
  1. 🔒 **Nothing saved** — "No accounts, no tracking. Your answers stay on this screen and disappear when you close this page."
  2. 📍 **Only what's needed** — "Your county, who's coming with you, and what you need. Never your address."
  3. 🚪 **Quick Exit** — "Hide this screen in one tap, anytime."
- **Small print under the cards:**
  - "For extra privacy, open this site in a private or incognito window. It won't appear in your browser history."
  - "Results draw from established national directories of domestic violence shelters: the SAF-T Program and DomesticShelters.org."
- **"Try Quick Exit before you start"** section below the cards (light teal background, rounded corners):
  - Text: "If someone walks in, tap "Quick Exit" in the top right corner, or press Esc twice on a computer. The screen switches to a banana bread recipe. To come back, scroll down and tap "Print Recipe.""
  - Button: **"Try Quick Exit now"** triggers the Quick Exit so she can practice.
  - When she comes back from the recipe, the section shows: "✓ That's how it works. Your answers are just as you left them." (Start over resets this.)
- **Name input:** "What should we call you?". Helper text: "A first name or nickname is fine — whatever feels safe." Field starts empty. Placeholder: "First name or nickname". The name is optional.
- **Name input and main button** sit below the Quick Exit section. **"Start →"** goes to the questionnaire.

## 3. Screen 2 — Triage questionnaire

All fields start empty; nothing is pre-selected.

- **"← Back"** button (returns to the homepage, keeping answers).
- **Header:** "WELCOME, [NAME]" in small caps (just "WELCOME" if no name was entered). Headline: "Let's find a safe place for your family."
- **Q1 — "Where are you right now?"** Dropdown, starting at "Select your county". Helper: "County only — we never ask for an address".
- **Q2 — "Who is coming with you?"** "Just me" / "Me and my child or children".
  - When she picks children, each child gets **Age** (Under 1 to 17) and **Gender** (Girl / Boy / Prefer not to say). There is "+ Add another child" and "Remove". **No names.**
- **Q3 — "Do you have pets you need to bring?"** "No pets" / "Yes, I have pets".
  - When she picks yes, she sets a count for each type with − / + buttons: **Dog, Cat, Other**. More than one pet is allowed. **No names.**
  - Helper: "Many emergency shelters can't take pets. We prioritize pet-inclusive options." *(no statistic)*
- **Q4 — "How soon do you need help?"** Cards, none selected:
  - "I need somewhere to go today or tonight"
  - "Within the next few days (Planning a safe window)"
  - "Gathering information for the future"
- **Button:** "Find my matches". It stays disabled until every question is answered, with a "Still needed: …" hint listing what's missing. A ~1-second pulse plays before the results appear.

## 4. Screen 3 — Results

- **"← Back"** button (returns to the questionnaire, keeping answers).
- **Header:** "YOUR MATCHES, [NAME]" (or "YOUR MATCHES").
- Under "Ranked by…": "Shelter information comes from established national directories: the SAF-T Program (pet-friendly shelters) and DomesticShelters.org (a national directory of U.S. and Canadian domestic violence programs)."
- **Ranking:** (1) serves her county, then (2) pets confirmed (if she has pets), then (3) distance from the center of her county.
- **Top result:** green **"Likely fit"** badge when the shelter serves her county and, if she has pets, pets are confirmed. Otherwise "Closest option".
  - **"Why it's ranked here"**: one line per reason, e.g. "Serves Travis County", "Pets accepted (SAF-T Program directory)", "On-site pet shelter (DomesticShelters.org)", "About N miles from the center of Travis County".
  - **Callout** "Why [Name] may qualify" (or "Why you may qualify"): built only from confirmed facts. It refers to companions generically, e.g. "so you, your 2 children, and your dog may be able to stay together." *(No statistics, no child or pet names.)*
- **Other options:** the other shelters, each with its own reasons. Shelters that don't serve her county show "Serves …, outside your area"; shelters with no confirmed pet policy show "Pets not confirmed".
- **Every result card** includes:
  - **Tap-to-call phone button** ("📞 Call 512-267-7233"), or "Phone number not yet verified" if there's no sourced number.
  - **"What to ask when you call"**: questions built from her answers, e.g. "Do you have space today?", "Do you accept a 14-year-old son?", "Can I bring my dog?". For shelters with an **off-site** pet program, the pet question becomes "Where would my dog stay, and can I visit?"
  - **"Pet info: [source]"** link (SAF-T Program directory, or DomesticShelters.org for shelters not in SAF-T), plus the other-details source and the last-verified date.
- **Under the results:** "Pet policies change. Always call to confirm." and a "Start over and clear my answers" link.
- **Coming soon (top card):** **"Save for Later (Secret Memory PIN)"**, with a clearly marked preview (BREAD • BLUE • RIVER • 84), and **"Call via Stealth Dial"**.
- **Removed:** the anonymized intake packet.

## 5. Data — `src/data/resources.json`

Fields: `name`, `city`, `countiesServed` (list), `phone`, `phoneLabel`, `acceptsPets` (true = confirmed, null = not confirmed), `listedInSaft`, `petHousing` ("on-site" / "off-site" / null), `petDetails`, `petInfoSource`, `otherDetailsSource`, `lastVerified`.

| Name | City | Counties served | Phone | Pets |
|---|---|---|---|---|
| SAFE Alliance | Austin | Travis | 512-267-7233 (24/7 SAFEline) | Accepted (SAF-T). On-site pet shelter (DomesticShelters.org) |
| Hope Alliance | Round Rock | Williamson, Travis | 800-460-7233 (24/7 hotline) | Off-site pet shelter (DomesticShelters.org). Not listed in SAF-T |
| Crisis Center of Comal County | New Braunfels | Comal | 830-620-4357 | Accepted (SAF-T) |

With Travis County selected, the order is SAFE Alliance → Hope Alliance → Crisis Center of Comal County.

The county dropdown offers Travis, Williamson, Hays, Comal, and Bastrop. Distances use approximate county centers and city coordinates in `src/lib/geo.js`.

## 6. Look & feel

Clean, professional, and empathetic, with a soothing teal/slate palette. Fully responsive (phone and desktop). The decoy switch and return must work every time.
