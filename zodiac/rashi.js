export function getRashi(deg){
  const signs = [
    "Aries","Taurus","Gemini","Cancer","Leo","Virgo",
    "Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"
  ];

  const index = Math.floor(deg / 30);
  return signs[index];
}
