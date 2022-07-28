require("dotenv").config();
const axios = require("axios").default;
const Player = require("../db/config/models/pushData");
const connectDB = require("../db/config/db");

// Connect to mongoDB
connectDB();

// Main player
const player = "Toremann";
// Main player server
const server = "Stormscale";
// API URL for put request
const apiURL = "https://check-pvp.fr/api/characters/eu/";

async function scrape() {
  const fetchURL = (url) => axios.put(url);

  axios.put(apiURL + server + "/" + player + "/battlenet").then((response) => {
    // Array for axios Promise.all function, arrays of URL's to be resolved.
    console.log("axios req to main url");
    let arrayOfPromisess = [].map(fetchURL);

    // Array for Promises URL's | push main char into array!
    arrayOfPromisess.push(apiURL + server + "/" + player + "/battlenet");

    // LOOP: Generate URL's for all characters belonging to player + server
    response.data.rerolls.forEach((character) => {
      console.log("found alt:", character.name);
      arrayOfPromisess.push(
        apiURL + character.realm + "/" + character.name + "/battlenet"
      );
    });
    console.log("push loop complete");

    // The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.
    function putAllData(arrayOfPromisess) {
      return Promise.all(
        arrayOfPromisess.map(fetchData),
        console.log("getting data for alts")
      );
    }

    // fetchData = axios.put(URL)
    async function fetchData(URL) {
      return axios
        .put(URL)
        .then(function (promise) {
          return {
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
          return console.log(error);
        });
    }

    putAllData(arrayOfPromisess)
      .then((resp) => {
        resp.forEach((respPlayer) => {
          let update = {
            player: respPlayer.player,
            realm: respPlayer.realm,
            ilvl: respPlayer.ilvl,
            rating2v2: respPlayer.rating2v2,
            wins2v2: respPlayer.wins2v2,
            loss2v2: respPlayer.loss2v2,
            rating3v3: respPlayer.rating3v3,
            wins3v3: respPlayer.wins3v3,
            loss3v3: respPlayer.loss3v3,
            ratingrbg: respPlayer.ratingrbg,
            winsrbg: respPlayer.winsrbg,
            lossrbg: respPlayer.lossrbg,
            lastupdate: respPlayer.lastupdate,
          };

          Player.findOneAndUpdate(
            { player: respPlayer.player },
            update,
            { upsert: true, new: true },
            function (error, result) {
              if (error) {
                console.log(error);
              } else {
                console.log(result);
              }
            }
          );
        });
      })
      .catch((e) => {
        console.log(e);
      });
  });
}

module.exports.scrape = scrape;
