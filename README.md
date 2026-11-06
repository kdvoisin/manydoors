# Many Doors

**Live site: https://kdvoisin.github.io/manydoors/**

Tell your story once. Find the doors that open.

A confidential family shelter-finder demo. See **[SPEC.md](SPEC.md)** for the full spec.

## Start the app
1. Open the `manydoors` folder in Finder.
2. Double-click **Start ManyDoors.command**. (The first time only, macOS may ask if you're sure. Choose **Open**. If it's blocked, right-click the file, choose **Open**, then click **Open** again.)
3. Your browser opens to **http://localhost:5173**.
4. Keep the black Terminal window open while you use the app. Close it when you're done.

## Try the main flow
1. On the home page, tap **Try Quick Exit now** to practice: the screen switches to a banana bread recipe. Scroll down and tap **🖨️ Print Recipe** to come back. Then enter a name and click **Start →**
2. Answer the four questions (county, who's coming, pets, how soon) and click **Find my matches**
3. On each result, use the **Call** button and the **What to ask when you call** list. Use **Back** or **Start over** (top right) to change answers
4. Click **Quick Exit** (or press Esc twice) to switch to the banana bread page. Click **🖨️ Print Recipe** (or press Esc twice) to come back. Everything you entered is still there.

## Shelter data
All shelters live in **`src/data/resources.json`**. Each entry has: `name`, `city`, `countiesServed` (a list), `phone`, `phoneLabel`, `acceptsPets` (`true` = confirmed, `null` = not confirmed), `listedInSaft`, `petHousing` (`"on-site"`, `"off-site"`, or `null`), `petDetails`, `petInfoSource`, `otherDetailsSource`, `lastVerified`.

- Pet info comes from the SAF-T Program directory: https://saftprogram.org/shelters/
- Other details come from DomesticShelters.org.
- To add a shelter in a new city, also add the city to `CITY_COORDS` in `src/lib/geo.js` (used for distance). To offer a new county in the dropdown, add it to `COUNTY_CENTERS` in the same file.

## Update the live site
After making changes, publish them with: `npm run deploy` (builds the app and pushes it to the `gh-pages` branch; the live site updates in about a minute).

## Tests
Automated browser tests live in `tmp/` (they use your installed Google Chrome). With the app running: `cd tmp && node test.mjs`. To test the live site instead: `cd tmp && BASE=https://kdvoisin.github.io/manydoors/ node test.mjs`

## For developers
`npm install`, then `npm run dev`. React 19 + Vite + Tailwind CSS v4. No storage, cookies, or network calls.
