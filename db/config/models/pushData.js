const mongoose = require("mongoose");

const playerSchema = mongoose.Schema(
  {
    player: String,
    realm: String,
    class: Number,
    ilvl: Number,
    rating2v2: Number,
    wins2v2: Number,
    loss2v2: Number,
    rating3v3: Number,
    wins3v3: Number,
    loss3v3: Number,
    ratingrbg: Number,
    winsrbg: Number,
    lossrbg: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Player", playerSchema);
