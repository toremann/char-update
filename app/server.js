const express = require("express");
const morgan = require("morgan");
const fs = require("fs");

const path = require("path");
const { scrape } = require("./app.js");
const app = express();
var ip = require("ip");
app.use(morgan());

// app.get('/', (req, res) => {
//     res.status(200).send('Hello there');
// })

// Endpoints for data ip:port/data/

app.get("/data/", (req, res) => {
  return fs.readFile(path.join(__dirname, "/data/data.json"), (err, data) => {
    if (err) {
      res.status(500).send("shit's fucked");
    }

    res.status(200).send(JSON.parse(data.toString()));
  });
});

app.listen(3000, () => {
  console.log("Server started", "IP:", ip.address(), "PORT 3000");
});

const timer = 200000;

function loopIt() {
  scrape();
  console.log("Waiting..", timer);
  setTimeout(loopIt, timer);
}
console.log("Scraping..");
loopIt();
