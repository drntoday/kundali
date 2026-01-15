import { sunLongitude } from "./sky/sun.js";
import { moonLongitude } from "./sky/moon.js";
import { lahiriAyanamsa } from "./zodiac/ayanamsa.js";
import { getRashi } from "./zodiac/rashi.js";
import { getNakshatra } from "./zodiac/nakshatra.js";
import { trueSolarTime } from "./time/trueSolarTime.js";
import { calculateLagna } from "./time/lagna.js";
import { getMahaDasha } from "./dasha/vimshottari.js";

async function start(){
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const place = document.getElementById("place").value;

  const geo = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${place}`);
  const g = await geo.json();

  const lon = g.results[0].longitude;

  const dt = new Date(date + "T" + time);

  const ayan = lahiriAyanamsa(dt);

  const sunTrop = sunLongitude(dt);
  const moonTrop = moonLongitude(dt);

  const sunSid = (sunTrop - ayan + 360) % 360;
  const moonSid = (moonTrop - ayan + 360) % 360;

  const sunRashi = getRashi(sunSid);
  const moonRashi = getRashi(moonSid);
  const moonNak = getNakshatra(moonSid);

  const tsm = trueSolarTime(dt, lon, g.results[0].timezone);
  const lagnaDeg = calculateLagna(tsm);
  const dasha = getMahaDasha(moonSid);

  document.getElementById("output").textContent =
    "Sun: " + sunSid.toFixed(2) + "° " + sunRashi + "\n" +
    "Moon: " + moonSid.toFixed(2) + "° " + moonRashi + "\n" +
    "Moon Nakshatra: " + moonNak + "\n" +
    "Maha Dasha Lord: " + dasha.lord + "\n" +
    "Remaining Years: " + dasha.remainingYears + "\n" +
    "Lagna: " + lagnaDeg.toFixed(2);
}
