const nakshatraLords = [
  "Ketu","Venus","Sun","Moon","Mars","Rahu","Jupiter","Saturn","Mercury",
  "Ketu","Venus","Sun","Moon","Mars","Rahu","Jupiter","Saturn","Mercury",
  "Ketu","Venus","Sun","Moon","Mars","Rahu","Jupiter","Saturn","Mercury"
];

const dashaYears = {
  Ketu:7,
  Venus:20,
  Sun:6,
  Moon:10,
  Mars:7,
  Rahu:18,
  Jupiter:16,
  Saturn:19,
  Mercury:17
};

export function getMahaDasha(moonDegree){
  const nakSize = 13.333333;
  const nakIndex = Math.floor(moonDegree / nakSize);
  const lord = nakshatraLords[nakIndex];

  const posInNak = moonDegree % nakSize;
  const balance = (nakSize - posInNak) / nakSize;

  const remainingYears = balance * dashaYears[lord];

  return {
    nakshatraIndex: nakIndex,
    lord: lord,
    remainingYears: remainingYears.toFixed(2)
  };
}
