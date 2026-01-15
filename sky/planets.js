const rad = Math.PI / 180;

function normalize(x){
  return (x % 360 + 360) % 360;
}

function kepler(M, e){
  let E = M;
  for(let i=0;i<6;i++){
    E = M + e * Math.sin(E);
  }
  return E;
}

export function planetLongitude(name, d){
  let N,i,w,a,e,M;

  if(name==="Mercury"){
    N=48.331; i=7.005; w=29.124; a=0.387; e=0.2056; M=168.656+4.092334*d;
  }
  if(name==="Venus"){
    N=76.680; i=3.394; w=54.884; a=0.723; e=0.0067; M=48.005+1.602130*d;
  }
  if(name==="Mars"){
    N=49.558; i=1.850; w=286.502; a=1.524; e=0.0934; M=18.602+0.524020*d;
  }
  if(name==="Jupiter"){
    N=100.454; i=1.303; w=273.877; a=5.203; e=0.0485; M=19.895+0.083085*d;
  }
  if(name==="Saturn"){
    N=113.663; i=2.489; w=339.393; a=9.537; e=0.0555; M=316.967+0.033444*d;
  }

  M = normalize(M)*rad;
  const E = kepler(M,e);

  const xv = a*(Math.cos(E)-e);
  const yv = a*(Math.sqrt(1-e*e)*Math.sin(E));

  const v = Math.atan2(yv,xv);
  const r = Math.sqrt(xv*xv + yv*yv);

  const lon = v + w*rad;
  return normalize(lon * 180/Math.PI);
}
