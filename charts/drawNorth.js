export function drawNorthChart(houses){

  const box = [
    [ "", houses[1].join(","), "" ],
    [ houses[2].join(","), "", houses[0].join(",") ],
    [ "", houses[3].join(","), "" ],
    [ houses[4].join(","), "", houses[11].join(",") ],
    [ "", houses[5].join(","), "" ],
    [ houses[6].join(","), "", houses[10].join(",") ],
    [ "", houses[7].join(","), "" ],
    [ houses[8].join(","), "", houses[9].join(",") ]
  ];

  let out = "";
  for(const row of box){
    out += row.join(" | ") + "\n";
  }
  return out;
}
