function norm(x){
  return (x % 360 + 360) % 360;
}

export function rahuKetu(d){
  const rahu = norm(125.04452 - 0.0529538083 * d);
  const ketu = norm(rahu + 180);
  return { rahu, ketu };
}

