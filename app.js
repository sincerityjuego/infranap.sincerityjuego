const map = new maplibregl.Map({
  container: 'map',
  style: 'https://demotiles.maplibre.org/style.json',
  center: [121.08, 14.33],   // Biñan, Laguna
  zoom: 12
});

const socket = io("https://YOUR-BACKEND.onrender.com"); // replace later

map.on('click', (e) => {
  socket.emit("getData", {
    lat: e.lngLat.lat,
    lng: e.lngLat.lng
  });
});

socket.on("locationData", data => {
  const panel = document.getElementById("panel");
  panel.style.display = "block";
  panel.innerHTML = `
    <h3>Live Area Monitor</h3>
    <p><b>Latitude:</b> ${data.lat}</p>
    <p><b>Longitude:</b> ${data.lng}</p>
    <p><b>Status:</b> ${data.status}</p>
    <p><b>Motion:</b> ${data.motion}</p>
    <p><b>Weather:</b> ${data.weather}</p>
  `;
});
