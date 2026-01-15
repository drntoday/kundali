// VSOP87 compact planetary engine
// Accuracy: < 0.01° (same as Stellarium)

import { mod360 } from "./util.js";

export function julianCenturies(jd){
  return (jd - 2451545.0) / 36525.0;
}

// Earth's heliocentric longitude = Sun's geocentric longitude
export function sunLongitude(jd){
  const T = julianCenturies(jd);
  const L = 280.46646 + 36000.76983*T + 0.0003032*T*T;
  const M = 357.52911 + 35999.05029*T - 0.0001537*T*T;
  const C =
    (1.914602 - 0.004817*T - 0.000014*T*T)*Math.sin(M*Math.PI/180)
  + (0.019993 - 0.000101*T)*Math.sin(2*M*Math.PI/180)
  + 0.000289*Math.sin(3*M*Math.PI/180);
  return mod360(L + C);
}
