import { mod360 } from "./util.js";

export function ascendant(jd, lat, lon){

  const rad = Math.PI/180;

  // Julian centuries
  const T = (jd - 2451545.0)/36525;

  // Mean sidereal time
  let theta =
    280.46061837
    + 360.98564736629*(jd - 2451545)
    + 0.000387933*T*T;

  theta = mod360(theta + lon) * rad;

  const eps = (23.439291 - 0.0130042*T) * rad;
  const phi = lat * rad;

  const tanA =
    1 / Math.cos(theta) *
    (Math.sin(theta) - Math.tan(phi)*Math.tan(eps));

  let A = Math.atan(tanA);

  if (Math.cos(theta) < 0) A += Math.PI;
  if (A < 0) A += 2*Math.PI;

  return mod360(A*180/Math.PI);
}
