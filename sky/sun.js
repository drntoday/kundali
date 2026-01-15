export function sunLongitude(date){
  const rad = Math.PI/180;

  const d = (date - new Date("2000-01-01T12:00:00Z")) / 86400000;

  const g = (357.529 + 0.98560028 * d) * rad;      // Mean anomaly
  const q = (280.459 + 0.98564736 * d) * rad;      // Mean longitude

  const L = q + (1.915 * Math.sin(g) + 0.020 * Math.sin(2*g)) * rad;

  return (L * 180/Math.PI + 360) % 360;
}
