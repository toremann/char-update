const axios = require("axios").default;

(async () => {
  const player = "Toremann";

  const server = "Stormscale";

  const apiURL = "https://check-pvp.fr/api/characters/eu/";

  let amountOfAlts = 0;

  let currentAlt = 0;

  // AXIOS HER?

  axios.put(apiURL + server + "/" + player + "/battlenet").then((response) => {
    // Set amout of alts
    amountOfAlts = Object.keys(response.data.rerolls).length;

    console.log(amountOfAlts);
    console.log(
      "Main:",
      response.data.name,
      "-",
      response.data.realm,
      "2v2:",
      response.data.rateatm2v2,
      "3v3:",
      response.data.rateatm3v3,
      "RBG:",
      response.data.rateatmrbg
    );

    for (; currentAlt < amountOfAlts; currentAlt++) {
      console.log(
        "Alt:",
        Object.entries(response.data.rerolls[currentAlt]).slice(0, 2),
        "Rating:",
        Object.entries(response.data.rerolls[currentAlt]).slice(8, 10)
      );
    }
  });
})();
