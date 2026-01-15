export function rahuKetu(d){
  const rahu = (125.04452 - 0.0529538083 * d) % 360;
  const ketu = (rahu + 180) % 360;
  return { rahu, ketu };
}
