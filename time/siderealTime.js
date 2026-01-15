export function julianDay(date){
  return date / 86400000 + 2440587.5;
}

export function localSiderealTime(jd, longitude){
  const T = (jd - 2451545.0) / 36525;
  let theta = 280.46061837
    + 360.98564736629 * (jd - 2451545)
    + 0.000387933 * T*T
    - T*T*T / 38710000;

  theta = (theta + longitude) % 360;
  return theta;
}
