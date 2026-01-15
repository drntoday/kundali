export function lahiriAyanamsa(date){
  const year = date.getFullYear();
  const t = (year - 2000) / 100;
  return 23.85675 + (0.013968 * t); // degrees
}
