// Let get an Express Server going
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

// All the good Live Connection sockty-ness
const socketio = require("socket.io");
const io = socketio(server);

// Game Logic
const RPS = require("./rpsGameLogic");
const bot = require("./botPlayer");
const { getFunName } = require("./helpers");

// Static client files
const clientPath = `${__dirname}/../client`;
app.use(express.static(clientPath));

let waitingPlayer = null;

io.on("connection", newPlayer => {
  // Name New Player
  newPlayer.name = getFunName();
  newPlayer.emit("player", newPlayer.name);

  // Wait for Play Mode request
  newPlayer.on("mode", mode => {
    switch (mode) {
      // Single player requested
      case "comp":
        console.log("SinglePlayer");
        break;

      // Multi player requested
      case "remote":
        if (waitingPlayer) {
          console.log("Multiplayer");
          new RPS(waitingPlayer, newPlayer);
          waitingPlayer = null;
          break;
        } else {
          waitingPlayer = newPlayer;
          waitingPlayer.emit("feedback", "Waiting for an opponent");
          console.log("Player Waiting");
          break;
        }

      // Resist the Dark Side
      default:
        console.log("Somebody is messing with the force");
    }
  });
});

server.on("error", err => {
  console.error("Server error:", err);
});

server.listen(8080, () => {
  console.log("Let's Get It On!");
});
