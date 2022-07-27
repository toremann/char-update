const axios = require("axios").default;
const fs = require("fs");
const path = require("path");
const Push = require("../db/config/models/pushData");
const connectDB = require("../db/config/db");

// Connect to mongoDB
connectDB();

async function scrape() {
  // Main player
  const player = "Toremann";
  // Main player server
  const server = "Stormscale";
  // API URL for put request
  const apiURL = "https://check-pvp.fr/api/characters/eu/";

  const fetchURL = (url) => axios.put(url);

  // Axios
  axios.put(apiURL + server + "/" + player + "/battlenet").then((response) => {
    // Data respons from Axios

    // Array for axios Promise.all function, arrays of URL's to be resolved.
    let arrayOfPromisess = [].map(fetchURL);

    // Array for Promises URL's | push main char into array!
    arrayOfPromisess.push(apiURL + server + "/" + player + "/battlenet");

    // Generate URL's for all alts
    response.data.rerolls.forEach((character) => {
      arrayOfPromisess.push(
        apiURL + character.realm + "/" + character.name + "/battlenet"
      );
    });

    // The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.
    function putAllData(arrayOfPromisess) {
      return Promise.all(arrayOfPromisess.map(fetchData));
    }

    // fetchData = axios.put(URL)
    function fetchData(URL) {
      return axios
        .put(URL)
        .then(function (promise) {
          return {
            // success: true,
            player: promise.data.name, // Player name
            realm: promise.data.realm, // Player server
            ilvl: promise.data.pvpGear, // Player PVP ilvl
            rating2v2: promise.data.rateatm2v2, // Rating 2v2
            wins2v2: promise.data.ratioWin2v2, // Wins
            loss2v2: promise.data.ratioLose2v2, // Loss
            rating3v3: promise.data.rateatm3v3, // Rating 3v3
            wins3v3: promise.data.ratioWin3v3, // Wins
            loss3v3: promise.data.ratioLose3v3, // Loss
            ratingrbg: promise.data.rateatmrbg, // Rating RBG
            winsrbg: promise.data.ratioWinRbg, // Wins
            lossrbg: promise.data.ratioLoseRbg, // Loss
            lastupdate: promise.data.lastModified, // Last updated date
          };
        })
        .catch(function (error) {
          return { success: false };
        });
    }

    putAllData(arrayOfPromisess)
      .then((resp) => {
        // Make a copy of old file

        fs.rename(
          path.join(__dirname, "./data/data.json"),
          path.join(__dirname, "./data/data_old.json"),
          function (err) {
            if (err) throw err;
            console.log("Renamed file data.json to data_old.json");
          }
        );

        // Write output to JSON file
        fs.writeFile(
          path.join(__dirname, "./data/data.json"),

          JSON.stringify(resp, null, 1),

          function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log(
                "Wrote to data.json",
                "|| Scraped:",
                arrayOfPromisess.length,
                "players"
              );
            }
          }
        );
      })
      .catch((e) => {
        console.log(e);
      });
  });
}

module.exports.scrape = scrape;
