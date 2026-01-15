import { julianDay, localSiderealTime } from "./siderealTime.js";

export function calculateLagna(date, latitude, longitude){

  const rad = Math.PI / 180;

  const jd = julianDay(date);
  const lst = localSiderealTime(jd, longitude) * rad;

  const obliq = 23.43929111 * rad;   // Earth tilt
  const lat = latitude * rad;

  const tanA = 1 / Math.cos(lst) *
               (Math.sin(lst) - Math.tan(lat) * Math.tan(obliq));

  let A = Math.atan(tanA);

  if (Math.cos(lst) < 0) A += Math.PI;
  if (A < 0) A += 2 * Math.PI;

  return (A * 180 / Math.PI);
}
