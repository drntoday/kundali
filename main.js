import { sunLongitude } from "./sky/sun.js";
import { moonLongitude } from "./sky/moon.js";
import { lahiriAyanamsa } from "./zodiac/ayanamsa.js";
import { getRashi } from "./zodiac/rashi.js";
import { getNakshatra } from "./zodiac/nakshatra.js";
import { trueSolarTime } from "./time/trueSolarTime.js";
import { calculateLagna } from "./time/lagna.js";
import { getMahaDasha } from "./dasha/vimshottari.js";
import { planetLongitude } from "./sky/planets.js";
import { rahuKetu } from "./sky/nodes.js";
import { buildNorthChart } from "./charts/north.js";
import { drawNorthChart } from "./charts/drawNorth.js";

async function start() {

  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const place = document.getElementById("place").value;

  if (!date || !time || !place) {
    alert("Fill all fields");
    return;
  }

  const geo = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${place}`);
  const g = await geo.json();

  if (!g.results || g.results.length === 0) {
    alert("Place not found");
    return;
  }

  const lat = g.results[0].latitude;
  const lon = g.results[0].longitude;
  const timezone = g.results[0].timezone;

  const dt = new Date(date + "T" + time);

  const ayan = lahiriAyanamsa(dt);

  // --- SUN & MOON ---
  const sunTrop = sunLongitude(dt);
  const moonTrop = moonLongitude(dt);

  const sunSid = (sunTrop - ayan + 360) % 360;
  const moonSid = (moonTrop - ayan + 360) % 360;

  const sunRashi = getRashi(sunSid);
  const moonRashi = getRashi(moonSid);
  const moonNak = getNakshatra(moonSid);

  // --- DAYS FROM J2000 ---
  const d = (dt - new Date("2000-01-01T12:00:00Z")) / 86400000;

  // --- PLANETS ---
  const mars = planetLongitude("Mars", d);
  const mercury = planetLongitude("Mercury", d);
  const venus = planetLongitude("Venus", d);
  const jupiter = planetLongitude("Jupiter", d);
  const saturn = planetLongitude("Saturn", d);

  const nodes = rahuKetu(d);

  const marsSid = (mars - ayan + 360) % 360;
  const mercurySid = (mercury - ayan + 360) % 360;
  const venusSid = (venus - ayan + 360) % 360;
  const jupiterSid = (jupiter - ayan + 360) % 360;
  const saturnSid = (saturn - ayan + 360) % 360;
  const rahuSid = (nodes.rahu - ayan + 360) % 360;
  const ketuSid = (nodes.ketu - ayan + 360) % 360;

  // --- LAGNA ---
  const tsm = trueSolarTime(dt, lon, timezone);
  const lagnaDeg = calculateLagna(tsm);

  // --- DASHA ---
  const dasha = getMahaDasha(moonSid);

  //////
  const planets = {
    Sun: sunSid,
    Moon: moonSid,
    Mars: marsSid,
    Mercury: mercurySid,
    Jupiter: jupiterSid,
    Venus: venusSid,
    Saturn: saturnSid,
    Rahu: rahuSid,
    Ketu: ketuSid
  };

  const chart = buildNorthChart(lagnaDeg, planets);
  const chartText = drawNorthChart(chart);

  // --- OUTPUT ---
  document.getElementById("output").textContent +=
    "\n\n--- North Indian Chart ---\n" + chartText;
    "Latitude: " + lat + "\n" +
    "Longitude: " + lon + "\n\n" +

    "Lagna: " + lagnaDeg.toFixed(2) + "°\n\n" +

    "Sun: " + sunSid.toFixed(2) + "° " + sunRashi + "\n" +
    "Moon: " + moonSid.toFixed(2) + "° " + moonRashi + "\n" +
    "Moon Nakshatra: " + moonNak + "\n\n" +

    "Mars: " + marsSid.toFixed(2) + "° " + getRashi(marsSid) + "\n" +
    "Mercury: " + mercurySid.toFixed(2) + "° " + getRashi(mercurySid) + "\n" +
    "Jupiter: " + jupiterSid.toFixed(2) + "° " + getRashi(jupiterSid) + "\n" +
    "Venus: " + venusSid.toFixed(2) + "° " + getRashi(venusSid) + "\n" +
    "Saturn: " + saturnSid.toFixed(2) + "° " + getRashi(saturnSid) + "\n" +
    "Rahu: " + rahuSid.toFixed(2) + "° " + getRashi(rahuSid) + "\n" +
    "Ketu: " + ketuSid.toFixed(2) + "° " + getRashi(ketuSid) + "\n\n" +

    "Maha Dasha Lord: " + dasha.lord + "\n" +
    "Remaining Years: " + dasha.remainingYears;
}
