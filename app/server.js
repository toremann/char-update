const express = require("express");
const { scrape, data } = require("./app.js");
const app = express();
var ip = require("ip");
const port = 3001;

app.listen(port, () => {
  console.log("Server started", "IP:", ip.address(), port);
});

const timer = 10000;

function loopIt() {
  scrape();
  console.log(data);
  console.log("Waiting..", timer);
  setTimeout(loopIt, timer);
}
console.log("Scraping..");
loopIt();
