// Approximate coordinates, used only to estimate driving-free straight-line
// distance for ranking. Counties use their approximate geographic center.
export const COUNTY_CENTERS = {
  'Travis County, TX': [30.33, -97.78],
  'Williamson County, TX': [30.65, -97.60],
  'Hays County, TX': [30.06, -98.03],
  'Comal County, TX': [29.81, -98.28],
  'Bastrop County, TX': [30.10, -97.31],
}

export const CITY_COORDS = {
  Austin: [30.27, -97.74],
  'New Braunfels': [29.70, -98.12],
  'Round Rock': [30.51, -97.68],
}

export const COUNTIES = Object.keys(COUNTY_CENTERS)

// Straight-line miles between two [lat, lng] points.
export function miles([lat1, lon1], [lat2, lon2]) {
  const r = (d) => (d * Math.PI) / 180
  const a =
    Math.sin(r(lat2 - lat1) / 2) ** 2 +
    Math.cos(r(lat1)) * Math.cos(r(lat2)) * Math.sin(r(lon2 - lon1) / 2) ** 2
  return 3958.8 * 2 * Math.asin(Math.sqrt(a))
}
