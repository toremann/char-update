const axios = require("axios").default;
const fs = require("fs");

(async () => {
  // Main player
  const player = "Toremann";
  // Main player server
  const server = "Stormscale";
  // API URL for put request
  const apiURL = "https://check-pvp.fr/api/characters/eu/";

  // arrow function takes url into axios.put(url)
  // API returns promise on PUT, API does responds 404 to GET!
  const fetchURL = (url) => axios.put(url);

  // Axios
  axios.put(apiURL + server + "/" + player + "/battlenet").then((response) => {
    // Data respons from Axios

    // Array for axios Promise.all function, all URLs in this array will be resolved
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
            ilvl: promise.data.pvpGear,
            rating2v2: promise.data.rateatm2v2, // Rating 2v2
            wins2v2: promise.data.ratioWin2v2,
            loss2v2: promise.data.ratioLose2v2,
            rating3v3: promise.data.rateatm3v3, // Rating 3v3
            wins3v3: promise.data.ratioWin3v3,
            loss3v3: promise.data.ratioLose3v3,
            ratingrbg: promise.data.rateatmrbg, // Rating RBG
            winsrbg: promise.data.ratioWinRbg,
            lossrbg: promise.data.ratioLoseRbg,
            lastupdate: promise.data.lastModified, // Last updated
          };
        })
        .catch(function (error) {
          return { success: false };
        });
    }

    putAllData(arrayOfPromisess)
      .then((resp) => {
  
        // Write output to JSON file
        fs.writeFile(

          // Uncomment this for correct path on RPI
          // "/home/pi/char-update/frontend/data/data.json",

          "./frontend/data/data.json",
          // Fix the output
          JSON.stringify(resp, null, 1),

          function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log("Wrote to data.json");
            }
          }
        );
      })
      .catch((e) => {
        console.log(e);
      });
  });
})();
