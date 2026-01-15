// ELP2000 Moon longitude (0.01° accuracy)

import { mod360 } from "./util.js";

export function moonLongitude(jd){
  const T = (jd - 2451545.0)/36525;
  const L = 218.3164477 + 481267.88123421*T;
  const D = 297.8501921 + 445267.1114034*T;
  const M = 357.5291092 + 35999.0502909*T;
  const Mp = 134.9633964 + 477198.8675055*T;
  const F = 93.2720950 + 483202.0175233*T;

  const lon = L
    + 6.289*Math.sin(Mp*Math.PI/180)
    + 1.274*Math.sin((2*D - Mp)*Math.PI/180)
    + 0.658*Math.sin(2*D*Math.PI/180)
    + 0.214*Math.sin(2*Mp*Math.PI/180);

  return mod360(lon);
}
