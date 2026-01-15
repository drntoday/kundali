import { trueSolarTime } from "./time/trueSolarTime.js";
import { calculateLagna } from "./time/lagna.js";
import { lahiriAyanamsa } from "./zodiac/ayanamsa.js";
import { getRashi } from "./zodiac/rashi.js";
import { getNakshatra } from "./zodiac/nakshatra.js";

async function start(){
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const place = document.getElementById("place").value;

  const geo = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${place}`);
  const g = await geo.json();

  const lat = g.results[0].latitude;
  const lon = g.results[0].longitude;
  const tz  = g.results[0].timezone;

  const dt = new Date(date + "T" + time);

  const tsm = trueSolarTime(dt, lon, tz);
  const tropicalLagna = calculateLagna(tsm);

  const ayan = lahiriAyanamsa(dt);
  const siderealLagna = (tropicalLagna - ayan + 360) % 360;

  const rashi = getRashi(siderealLagna);
  const nak = getNakshatra(siderealLagna);

  document.getElementById("output").textContent =
    "Latitude: " + lat + "\n" +
    "Longitude: " + lon + "\n" +
    "Lagna (Sidereal): " + siderealLagna.toFixed(2) + "\n" +
    "Rashi: " + rashi + "\n" +
    "Nakshatra: " + nak;
}
