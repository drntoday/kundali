export function equationOfTime(day){
  const B = (360/365) * (day - 81);
  const rad = Math.PI/180;
  return 9.87 * Math.sin(2*B*rad) - 7.53 * Math.cos(B*rad) - 1.5 * Math.sin(B*rad);
}
