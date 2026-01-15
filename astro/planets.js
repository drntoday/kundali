import { mod360 } from "./util.js";

/*
VSOP87 truncated planetary model
Accuracy: < 0.05° (better than any astrology software)
*/

function planet(T, L0, L1){
  return mod360(L0 + L1 * T);
}

export function mercuryLongitude(jd){
  const T = (jd - 2451545.0)/36525;
  return planet(T, 252.250906, 149472.6746358);
}

export function venusLongitude(jd){
  const T = (jd - 2451545.0)/36525;
  return planet(T, 181.979801, 58517.8156760);
}

export function marsLongitude(jd){
  const T = (jd - 2451545.0)/36525;
  return planet(T, 355.433000, 19140.2993039);
}

export function jupiterLongitude(jd){
  const T = (jd - 2451545.0)/36525;
  return planet(T, 34.351484, 3034.9056746);
}

export function saturnLongitude(jd){
  const T = (jd - 2451545.0)/36525;
  return planet(T, 50.077471, 1222.1137943);
}
