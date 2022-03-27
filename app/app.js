const axios = require("axios").default;
const fs = require("fs");

(async () => {
  const player = "Toremann";
  const server = "Stormscale";

 

  const apiURL = "https://check-pvp.fr/api/characters/eu/";

  let dataResponse = [];

  // Alt's data for new axios request
  let dataResponseAlts = [];

  // AXIOS HER?

  axios.put(apiURL + server + "/" + player + "/battlenet").then((response) => {
    dataResponse.push(response.data);
    dataResponseAlts.push(JSON.stringify(response.data.rerolls, ['name', 'realm'], 5))

    console.log('Alts:', dataResponseAlts)

    let altPlayer = dataResponseAlts.name;
    let altPlayerServer = dataResponseAlts.realm;
    // console.log("DataResponse:", dataResponse);
    // console.log("DataResponseAlts:", dataResponseAlts);
    // console.log(amountOfAlts);
    // console.log(JSON.stringify(dataResponse, ['name', 'realm', 'rateatm2v2', 'rateatm3v3', 'rateatmrbg', 'rerolls'], 1))

    // Find information I want
    let dataStringfy = JSON.stringify(dataResponse, ['name', 'realm', 'rateatm2v2', 'rateatm3v3', 'rateatmrbg', 'rerolls'], 1);

    console.log(altPlayer, altPlayerServer)

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
