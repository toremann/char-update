const { update } = require("./app.js");

const express = require("express");
const app = express();

app.get("/update", (req, res) => {
  update();
});

app.listen(3000);
