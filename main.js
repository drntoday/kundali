async function start(){
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const place = document.getElementById("place").value;

  if(!date || !time || !place){
    alert("Fill all fields");
    return;
  }

  const geo = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${place}`);
  const g = await geo.json();

  if(!g.results){
    alert("Place not found");
    return;
  }

  const lat = g.results[0].latitude;
  const lon = g.results[0].longitude;
  const tz  = g.results[0].timezone;

  document.getElementById("output").textContent =
    "Latitude: " + lat + "\n" +
    "Longitude: " + lon + "\n" +
    "Timezone: " + tz;
}
