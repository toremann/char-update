const axios = require("axios").default;
const fs = require("fs");

(async () => {
  const player = "Toremann";
  const server = "Stormscale";
  const apiURL = "https://check-pvp.fr/api/characters/eu/";

  let dataResponse = [];

  // Alt's data for new axios request
  let dataResponseAlts = [];

  // Array of urls: https://check-pvp.fr/api/characters/eu/REALM/NAME/battlenet
  let arrayOfPromisess = [];

  // AXIOS HER?

  axios.put(apiURL + server + "/" + player + "/battlenet").then((response) => {
    dataResponse.push(response.data);
    dataResponseAlts.push(
      JSON.stringify(response.data.rerolls, ["name", "realm"])
    );
    // FILL arrayOfPromisess
    arrayOfPromisess.push(
      apiURL +
        dataResponseAlts[(0, 1)] +
        "/" +
        dataResponseAlts[(0, 2)] +
        "/battlenet"
    );
    console.log("array of promisess:", arrayOfPromisess);

    // axios.put(apiURL + dataResponseAlts.server + "/" + dataResponseAlts.name + "/battlenet").then((response) => {
    //   dataReponseAltsRating.push(JSON.stringify(response))
    // }
    // )

    // Find information I want for main char
    let dataStringfy = JSON.stringify(
      dataResponse,
      ["name", "realm", "rateatm2v2", "rateatm3v3", "rateatmrbg", "rerolls"],
      1
    );

    console.log("dataresponsealts:", dataResponseAlts);

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
