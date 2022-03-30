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
    let dataResponse = [];

    // Array for Promises URL's
    let arrayOfPromisess = [].map(fetchURL);

    // Push data from respons to dataRespons array
    dataResponse.push(response.data);

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
            player: promise.data.name,
            realm: promise.data.realm,
            rating2v2: promise.data.rateatm2v2,
            rating3v3: promise.data.rateatm3v3,
            ratingrbg: promise.data.rateatmrbg,
          };
        })
        .catch(function (error) {
          return { success: false };
        });
    }

    putAllData(arrayOfPromisess)
      .then((resp) => {
        //Array for alts
        let alts = [];
        //Push promise response to alts array
        alts.push(resp);
      })
      .catch((e) => {
        console.log(e);
      });

    //Stringify dataRespons and write file to data.json
    let dataStringfy = JSON.stringify(
      dataResponse,
      ["name", "realm", "rateatm2v2", "rateatm3v3", "rateatmrbg"],
      1
    );

    // Write data from respons to data.json
    fs.writeFile("data.json", dataStringfy, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Wrote to data.json");
      }
    });
  });
})();
