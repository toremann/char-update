const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

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

function loopIt() {
  require("./app");
  console.log("Waiting..");
  setTimeout(loopIt, 20000);
}
console.log("Scraping..");
loopIt();
