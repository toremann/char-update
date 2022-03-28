const axios = require("axios").default;
const fs = require("fs");

(async () => {
  // Main player
  const player = "Toremann";
  // Main player server
  const server = "Stormscale";
  // API URL for put request
  const apiURL = "https://check-pvp.fr/api/characters/eu/";

  // Axios
  axios.put(apiURL + server + "/" + player + "/battlenet").then((response) => {
    // Data respons from Axios
    let dataResponse = [];

    // Array for Promises URL's
    let arrayOfPromisess = [];

    // Push data from respons to dataRespons array
    dataResponse.push(response.data);

    // Generate URL's for all alts
    response.data.rerolls.forEach((character) => {
      arrayOfPromisess.push(
        apiURL + character.realm + "/" + character.name + "/battlenet"
      );
    });

    Promise.all(arrayOfPromisess).then((response) => {
      console.log(response);
    });

    // Stringify dataRespons and write file to data.json
    let dataStringfy = JSON.stringify(
      dataResponse,
      ["name", "realm", "rateatm2v2", "rateatm3v3", "rateatmrbg", "rerolls"],
      1
    );

    // Write data from respons to data.json
    let test = fs.writeFile("data.json", dataStringfy, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Wrote to data.json");
      }
    });
  });
})();
