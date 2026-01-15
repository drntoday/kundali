export function localSiderealTime(trueSolarMinutes){
  return (trueSolarMinutes * 1.0027379) % 1440;
}
