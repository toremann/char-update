const express = require("express");
const fs = require("fs");
const path = require("path");
const { scrape } = require("./app.js");
const app = express();
var ip = require("ip");
const port = 3001;

app.get("/data/", (req, res) => {
  return fs.readFile(path.join(__dirname, "/data/data.json"), (err, data) => {
    if (err) {
      res.status(500).send("shit's fucked");
    }

    res.status(200).send(JSON.parse(data.toString()));
  });
});

// Endpoint for old data ip:port/data/old

app.get("/data/old", (req, res) => {
  return fs.readFile(
    path.join(__dirname, "/data/data_old.json"),
    (err, data) => {
      if (err) {
        res.status(500).send("shit's fucked");
      }

      res.status(200).send(JSON.parse(data.toString()));
    }
  );
});

app.listen(port, () => {
  console.log("Server started", "IP:", ip.address(), port);
});

const timer = 10000;

function loopIt() {
  scrape();
  console.log("Waiting..", timer);
  setTimeout(loopIt, timer);
}
console.log("Scraping..");
loopIt();
