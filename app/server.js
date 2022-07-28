const { scrape } = require("./app.js");

const timer = 10000;

function loopIt() {
  scrape();
  console.log("Waiting..", timer);
  setTimeout(loopIt, timer);
}
console.log("Scraping..");
loopIt();
