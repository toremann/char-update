const axios = require("axios").default;
const fs = require("fs");

(async () => {
  const player = "Toremann";

  const server = "Stormscale";

  const apiURL = "https://check-pvp.fr/api/characters/eu/";

  let amountOfAlts = 0;

  let currentAlt = 0;

  let dataResponse = [];
  let dataResponseAlts = [];

  // AXIOS HER?

  axios.put(apiURL + server + "/" + player + "/battlenet").then((response) => {
    dataResponse.push(response.data);
    dataResponseAlts.push(response.data.rerolls);

     // Set amout of alts
     amountOfAlts = Object.keys(response.data.rerolls).length;

    // console.log("DataResponse:", dataResponse);
    // console.log("DataResponseAlts:", dataResponseAlts);
    // console.log(amountOfAlts);
    console.log(JSON.stringify(dataResponse, ['name', 'realm', 'rateatm2v2', 'rateatm3v3', 'rateatmrbg', 'rerolls'], 1))

    // for (; currentAlt < amountOfAlts; currentAlt++) {
    //   console.log(
    //     "Alt:",
    //     Object.entries(response.data.rerolls[currentAlt]).slice(0, 2),
    //     "Rating:",
    //     Object.entries(response.data.rerolls[currentAlt]).slice(8, 10)
    //   );
    // }

    let dataStringfy = JSON.stringify(dataResponse, ['name', 'realm', 'rateatm2v2', 'rateatm3v3', 'rateatmrbg', 'rerolls'], 1);

    let test = fs.writeFile("data.json", dataStringfy, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Success");
      }
    });
  });
})();
