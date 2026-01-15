export function longitudeCorrection(longitude, timezone){
  const stdMeridian = getStandardMeridian(timezone);
  const diff = longitude - stdMeridian;
  return diff * 4; // minutes
}

function getStandardMeridian(tz){
  if(tz === "Asia/Kolkata") return 82.5;
  if(tz === "Europe/London") return 0;
  if(tz === "America/New_York") return -75;
  if(tz === "America/Chicago") return -90;
  if(tz === "America/Los_Angeles") return -120;
  return 0;
}
