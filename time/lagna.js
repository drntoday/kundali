import { localSiderealTime } from "./siderealTime.js";

export function calculateLagna(trueSolarMinutes){
  const lst = localSiderealTime(trueSolarMinutes);
  const deg = (lst / 4); // 4 minutes = 1 degree
  const lagna = deg % 360;
  return lagna;
}
