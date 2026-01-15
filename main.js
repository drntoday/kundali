import { getRashi } from "./zodiac/rashi.js";
import { getNakshatra } from "./zodiac/nakshatra.js";
import { getMahaDasha } from "./dasha/vimshottari.js";
import { buildNorthChart } from "./charts/north.js";
import { drawNorthChart } from "./charts/drawNorth.js";

import { sunLongitude } from "./astro/vsop87.js";
import { moonLongitude } from "./astro/elp2000.js";
import { trueNode } from "./astro/nodes.js";
import { ascendant } from "./astro/ascendant.js";
import { lahiriAyanamsa } from "./astro/ayanamsa.js";
import {
  mercuryLongitude,
  venusLongitude,
  marsLongitude,
  jupiterLongitude,
  saturnLongitude
} from "./astro/planets.js";

function julianDay(date){
  return date / 86400000 + 2440587.5;
}

document.getElementById("generate").addEventListener("click", start);

async function start() {
  try {
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const place = document.getElementById("place").value;

    if (!date || !time || !place) {
      alert("Fill all fields");
      return;
    }

    // --- Geo lookup ---
    const geo = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${place}`);
    const g = await geo.json();
    if (!g.results || g.results.length === 0) {
      alert("Place not found");
      return;
    }

    const lat = g.results[0].latitude;
    const lon = g.results[0].longitude;

    // --- Date to JD ---
    const dt = new Date(date + "T" + time);
    const jd = julianDay(dt);

    // --- Ayanamsa ---
    const ayan = lahiriAyanamsa(jd);

    // --- Luminaries ---
    const sunSid  = (sunLongitude(jd)  - ayan + 360) % 360;
    const moonSid = (moonLongitude(jd) - ayan + 360) % 360;

    // --- Planets (VSOP87) ---
    const mercurySid = (mercuryLongitude(jd) - ayan + 360) % 360;
    const venusSid   = (venusLongitude(jd)   - ayan + 360) % 360;
    const marsSid    = (marsLongitude(jd)    - ayan + 360) % 360;
    const jupiterSid = (jupiterLongitude(jd) - ayan + 360) % 360;
    const saturnSid  = (saturnLongitude(jd)  - ayan + 360) % 360;

    // --- Nodes ---
    const rahuSid = (trueNode(jd) - ayan + 360) % 360;
    const ketuSid = (rahuSid + 180) % 360;

    // --- Lagna ---
    const lagnaDeg = (ascendant(jd, lat, lon) - ayan + 360) % 360;

    // --- Rashi & Nakshatra ---
    const sunRashi  = getRashi(sunSid);
    const moonRashi = getRashi(moonSid);
    const moonNak   = getNakshatra(moonSid);

    // --- Dasha ---
    const dasha = getMahaDasha(moonSid);

    // --- Chart ---
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

    // --- Output ---
    document.getElementById("output").textContent =
      "Latitude: " + lat + "\n" +
      "Longitude: " + lon + "\n\n" +

      "Lagna: " + lagnaDeg.toFixed(2) + "° (" + getRashi(lagnaDeg) + ")\n\n" +

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
