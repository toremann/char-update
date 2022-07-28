const axios = require("axios").default;
const Player = require("../db/config/models/pushData");
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

  axios.put(apiURL + server + "/" + player + "/battlenet").then((response) => {
    // Array for axios Promise.all function, arrays of URL's to be resolved.
    let arrayOfPromisess = [].map(fetchURL);

    // Array for Promises URL's | push main char into array!
    arrayOfPromisess.push(apiURL + server + "/" + player + "/battlenet");

    // LOOP: Generate URL's for all characters belonging to player + server
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
        const respArray = resp;

        // const filter = { player: resp.player };

        // const update = {
        //   rating2v2: resp.rating2v2,
        //   wins2v2: resp.ratioWin2v2,
        //   loss2v2: resp.ratioLose2v2,
        //   rating3v3: resp.rateatm3v3,
        //   wins3v3: resp.ratioWin3v3,
        //   loss3v3: resp.ratioLose3v3,
        //   ratingrbg: resp.rateatmrbg,
        //   winsrbg: resp.ratioWinRbg,
        //   lossrbg: resp.ratioLoseRbg,
        //   lastupdate: resp.lastModified,
        // };

        respArray.forEach((player) => {
          // from response check if player exists in DB
          if (Player.exists({ player })) {
            // if player exists Player.findOneAndUpdate

            // Player.findOneAndUpdate(
            //   filter,
            //   update,
            //   { new: true },
            //   function (error, result) {
            //     if (error) {
            //       console.log("findupdate_error:", error);
            //     } else {
            //       console.log("findupdate_result:", result);
            //     }
            //   }
            // );

            console.log("exists", player.player);
          } else {
            // Push data to mongo DB
            // Player.create(resp[0], function (err) {
            //   if (err) return console.log("Database error!");
            //   console.log("Wrote data to DB!");
            // });

            // does not exist Player.Create
            console.log("does not exists", player.player);
          }
        });
      })
      .catch((e) => {
        console.log(e);
      });
  });
}

module.exports.scrape = scrape;
