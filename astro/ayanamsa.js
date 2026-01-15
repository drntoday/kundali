export function lahiriAyanamsa(jd){
  const T = (jd - 2451545.0)/36525;
  return 22.460148 + 1.396042*T + 0.000087*T*T;
}
