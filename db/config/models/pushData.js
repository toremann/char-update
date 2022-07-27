const mongoose = require("mongoose");

// TODO:
// Push player data to mongodb

const pushSchema = mongoose.Schema(
  {
    player: String, //promise.data.name, // Player name
    realm: String, // promise.data.realm, // Player server
    ilvl: Number, // promise.data.pvpGear, // Player PVP ilvl
    rating2v2: Number, //promise.data.rateatm2v2, // Rating 2v2
    wins2v2: Number, // promise.data.ratioWin2v2, // Wins
    loss2v2: Number, // promise.data.ratioLose2v2, // Loss
    rating3v3: Number, // promise.data.rateatm3v3, // Rating 3v3
    wins3v3: Number, /// promise.data.ratioWin3v3, // Wins
    loss3v3: Number, // promise.data.ratioLose3v3, // Loss
    ratingrbg: Number, // promise.data.rateatmrbg, // Rating RBG
    winsrbg: Number, // promise.data.ratioWinRbg, // Wins
    lossrbg: Number, // promise.data.ratioLoseRbg, // Loss
    // lastupdate: promise.data.lastModified, // Last updated date <-- Not needed as we have timestamps: true
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Push", pushSchema);
