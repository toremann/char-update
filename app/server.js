const express = require("express");
const morgan = require("morgan");
const fs = require("fs");

const path = require("path");
const { scrape } = require("./app.js");
const app = express();
app.use(morgan());

// app.get('/', (req, res) => {
//     res.status(200).send('Hello there');
// })

app.get("/", (req, res) => {
  return fs.readFile(path.join(__dirname, "data.json"), (err, data) => {
    if (err) {
      res.status(500).send("shit's fucked");
    }

    res.status(200).send(JSON.parse(data.toString()));
  });
});

app.listen(3000, () => {
  console.log("Server started and listening on port 3000");
});

function msToTime(duration) {
  var milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
}

const timer = 20000;

function loopIt() {
  scrape();
  console.log("Waiting..", msToTime(timer));
  setTimeout(loopIt, timer);
}
console.log("Scraping..");
loopIt();
