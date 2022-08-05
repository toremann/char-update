require("dotenv").config();
const axios = require("axios").default;
const Player2 = require("../db/config/models/pushData");
const connectDB = require("../db/config/db");

// Connect to mongoDB
connectDB();

// Main player
const player = process.env.PLAYERNAME || "Toremann";
// Main player server
const server = process.env.SERVER || "Stormscale";
// API URL for put request
const apiURL = process.env.API || "https://check-pvp.fr/api/characters/eu/";

async function update() {
  const fetchURL = (url) => axios.put(url);

  axios.put(apiURL + server + "/" + player + "/battlenet").then((response) => {
    // Array for axios Promise.all function, arrays of URL's to be resolved.
    let arrayOfPromisess = [].map(fetchURL);

    // Array for Promises URL's | push main char into array!
    arrayOfPromisess.push(apiURL + server + "/" + player + "/battlenet");

    // LOOP: Generate URL's for all characters belonging to player + server
    response.data.rerolls.forEach((character) => {
      console.log("Found alt:", character.name);
      arrayOfPromisess.push(
        apiURL + character.realm + "/" + character.name + "/battlenet"
      );
    });

    // The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.
    function putAllData(arrayOfPromisess) {
      return Promise.all(
        arrayOfPromisess.map(fetchData),
        console.log("Getting data...")
      );
    }

    // fetchData = axios.put(URL)
    async function fetchData(URL) {
      return axios
        .put(URL)
        .then(function (promise) {
          return {
            player: promise.data.name,
            realm: promise.data.realm,
            class: promise.data.class,
            ilvl: promise.data.pvpGear,
            checked: promise.data.nombreRecherche,
            rating2v2: promise.data.rateatm2v2,
            wins2v2: promise.data.ratioWin2v2,
            loss2v2: promise.data.ratioLose2v2,
            rating3v3: promise.data.rateatm3v3,
            wins3v3: promise.data.ratioWin3v3,
            loss3v3: promise.data.ratioLose3v3,
            ratingrbg: promise.data.rateatmrbg,
            winsrbg: promise.data.ratioWinRbg,
            lossrbg: promise.data.ratioLoseRbg,
            lastupdate: promise.data.lastModified,
            
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
            class: respPlayer.class,
            ilvl: respPlayer.ilvl,
            checked: respPlayer.checked,
            currentrating2v2: respPlayer.rating2v2,
            wins2v2: respPlayer.wins2v2,
            loss2v2: respPlayer.loss2v2,
            currentrating3v3: respPlayer.rating3v3,
            wins3v3: respPlayer.wins3v3,
            loss3v3: respPlayer.loss3v3,
            currentratingrbg: respPlayer.ratingrbg,
            winsrbg: respPlayer.winsrbg,
            lossrbg: respPlayer.lossrbg,
            lastupdate: respPlayer.lastupdate,
          };
          let updateRating = {
            rating2v2: {
              rating: respPlayer.rating2v2,
              date: new Date().toLocaleString("en-GB"),
              wins: respPlayer.wins2v2,
              loss: respPlayer.loss2v2,
            },
            rating3v3: {
              rating: respPlayer.rating3v3,
              date: new Date().toLocaleString("en-GB"),
              wins: respPlayer.wins3v3,
              loss: respPlayer.loss3v3,
            },
            ratingrbg: {
              rating: respPlayer.ratingrbg,
              date: new Date().toLocaleString("en-GB"),
              wins: respPlayer.winsrbg,
              loss: respPlayer.lossrbg,
            },
          };

          Player2.findOneAndUpdate(
            { player: respPlayer.player },
            update,
            { upsert: true, new: true },
            function (error, result) {
              if (error) {
                console.log(error);
              } else {
                console.log("Saved", respPlayer.player, "to db", respPlayer.checked)
              }
            }
          );
          Player2.update(
            { player: respPlayer.player },
            {
              $push: updateRating,
            },
            function (error, result) {
              if (error) {
                console.log(error);
              } else {
                console.log("Saved ratings", respPlayer.player, "to db");
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

module.exports.update = update;
