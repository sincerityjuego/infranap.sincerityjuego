const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", socket => {
  console.log("User connected");

  socket.on("getData", coords => {
    const fakeMotion = Math.random() > 0.5 ? "MOVING" : "AT REST";
    const fakeWeather = ["Sunny", "Rainy", "Storm Incoming"][Math.floor(Math.random()*3)];

    socket.emit("locationData", {
      lat: coords.lat.toFixed(5),
      lng: coords.lng.toFixed(5),
      status: "ACTIVE",
      motion: fakeMotion,
      weather: fakeWeather
    });
  });
});

server.listen(3000, () => {
  console.log("GeoVision backend running");
});
