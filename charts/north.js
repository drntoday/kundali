export function buildNorthChart(lagnaDeg, planets){

  const houses = Array(12).fill("").map(() => []);

  // Lagna sign
  const lagnaSign = Math.floor(lagnaDeg / 30);

  // place planets into houses
  for(const p in planets){
    const sign = Math.floor(planets[p] / 30);
    let house = sign - lagnaSign;
    if(house < 0) house += 12;
    houses[house].push(p);
  }

  return houses;
}
