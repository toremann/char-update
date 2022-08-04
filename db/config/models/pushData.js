const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
    player: String,
    realm: String,
    class: Number,
    ilvl: Number,
    currentrating2v2: Number,
    rating2v2: [
      {
        date: { type: Date },
        rating: { type: Number },
        wins: { type: Number },
        loss: { type: Number },
      },
    ],
    wins2v2: Number,
    loss2v2: Number,
    currentrating3v3: Number,
    rating3v3: [
      {
        date: { type: Date },
        rating: { type: Number },
        wins: { type: Number },
        loss: { type: Number },
      },
    ],
    wins3v3: Number,
    loss3v3: Number,
    currentratingrbg: Number,
    ratingrbg: [
      {
        date: { type: Date },
        rating: { type: Number },
        wins: { type: Number },
        loss: { type: Number },
      },
    ],
    winsrbg: Number,
    lossrbg: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Player2", playerSchema);
