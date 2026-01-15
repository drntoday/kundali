export function moonLongitude(date){
  const rad = Math.PI/180;
  const d = (date - new Date("2000-01-01T12:00:00Z")) / 86400000;

  const L = (218.316 + 13.176396 * d) * rad;     // Mean longitude
  const M = (134.963 + 13.064993 * d) * rad;     // Moon anomaly
  const F = (93.272 + 13.229350 * d) * rad;      // Latitude argument

  const lon = L + (6.289 * Math.sin(M) * rad);
  return (lon * 180/Math.PI + 360) % 360;
}
