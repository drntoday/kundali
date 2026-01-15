import { longitudeCorrection } from "./longitude.js";
import { equationOfTime } from "./equationOfTime.js";

export function trueSolarTime(dateObj, longitude, timezone){
  const start = new Date(dateObj.getFullYear(),0,0);
  const diff = dateObj - start;
  const day = Math.floor(diff / (1000*60*60*24));

  const eot = equationOfTime(day);
  const longCorr = longitudeCorrection(longitude, timezone);

  const minutes = dateObj.getHours()*60 + dateObj.getMinutes();
  return minutes + eot + longCorr;
}
