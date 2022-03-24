const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    // Set headless to false to launch chromium and see the script work
    headless: true,
  });

  // Players to check
  const player = [
    "Toremann",
    "Totemtore",
    "Tutoress",
    "Luksustore",
    "Torebukk",
  ];
  // Player server
  const server = "Stormscale/";
  const url = "https://check-pvp.fr/eu/";

  // Vars for loop
  let playerLength = player.length;
  let players = 0;

  const context = await browser.newContext();

  // Open new page
  const page = await context.newPage();

  // Array for ratings (2v2, 3v3 and RBG)
  const ratingArray = [];

  // The loop
  console.log("Updating", player.length, "players");
  console.log("---------------------");
  for (; players < playerLength; players++) {
    await page.goto(url + server + player[players]);
    console.log("Player:", player[players], "-", server);

    // Get the rating
    const findRating = await page.$$(".cote-atm-value");

    for (const p of findRating) {
      const ratingTrimmed = await page.evaluate((el) => el.innerText.trim(), p);
      // Push output from ratingTrimmed to ratingArray
      ratingArray.push(ratingTrimmed);
    }

    console.log("2v2 rating:", ratingArray[0]);
    console.log("3v3 rating:", ratingArray[1]);
    console.log("RBG rating:", ratingArray[2]);

    // Clear array and loop again with empty array
    ratingArray.length = 0;

    // Update the player
    await page.locator("text=Update now").click();
    console.log("Updating:", player[players], "-", server);
    await page.locator("text=Yes").click();
    console.log("Update success!");
    console.log("---------------------");
  }

  await context.close();
  await browser.close();
  console.log("\x1b[33m%s\x1b[0m", "Update finished :)");
})();
