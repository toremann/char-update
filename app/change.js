var jsonDiff = require('json-diff')

var oldJson = require("./data/data_old.json");

var newJson = require("./data/data.json");

console.log(jsonDiff.diffString(oldJson, newJson, {full: true}));