import { mod360 } from "./util.js";

export function trueNode(jd){
  const T = (jd - 2451545.0)/36525;

  // Mean ascending node of Moon (IAU)
  const omega =
    125.044555
    - 1934.1361849*T
    + 0.0020762*T*T;

  return mod360(omega);
}
