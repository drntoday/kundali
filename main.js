import { trueSolarTime } from "./time/trueSolarTime.js";
import { calculateLagna } from "./time/lagna.js";

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
  const lagna = calculateLagna(tsm);

  document.getElementById("output").textContent =
    "Latitude: " + lat + "\n" +
    "Longitude: " + lon + "\n" +
    "True Solar Minutes: " + tsm.toFixed(2) + "\n" +
    "Lagna Degree: " + lagna.toFixed(2);
}
