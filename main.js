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
  try {
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

    // Sun & Moon
    const sunSid = (sunLongitude(dt) - ayan + 360) % 360;
    const moonSid = (moonLongitude(dt) - ayan + 360) % 360;

    const sunRashi = getRashi(sunSid);
    const moonRashi = getRashi(moonSid);
    const moonNak = getNakshatra(moonSid);

    // Days from J2000
    const d = (dt - new Date("2000-01-01T12:00:00Z")) / 86400000;

    // Planets
    const marsSid = (planetLongitude("Mars", d) - ayan + 360) % 360;
    const mercurySid = (planetLongitude("Mercury", d) - ayan + 360) % 360;
    const venusSid = (planetLongitude("Venus", d) - ayan + 360) % 360;
    const jupiterSid = (planetLongitude("Jupiter", d) - ayan + 360) % 360;
    const saturnSid = (planetLongitude("Saturn", d) - ayan + 360) % 360;

    const nodes = rahuKetu(d);
    const rahuSid = (nodes.rahu - ayan + 360) % 360;
    const ketuSid = (nodes.ketu - ayan + 360) % 360;

    // Lagna
    const lagnaDeg = calculateLagna(dt, lat, lon);

    // Dasha
    const dasha = getMahaDasha(moonSid);

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

    document.getElementById("output").textContent =
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
      "Remaining Years: " + dasha.remainingYears + "\n\n" +

      "--- North Indian Chart ---\n" +
      chartText;

  } catch (e) {
    document.getElementById("output").textContent = "ERROR: " + e.message;
    console.error(e);
  }
}
document.getElementById("generate").addEventListener("click", start);

