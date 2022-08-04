const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
    player: String,
    realm: String,
    class: Number,
    ilvl: Number,
    rating2v2: [
      {
        date: { type: Date },
        rating: { type: Number }
      }
    ],
    wins2v2: Number,
    loss2v2: Number,
    rating3v3: [
    {
      date: { type: Date },
      rating: { type: Number}
    }
  ],
    wins3v3: Number,
    loss3v3: Number,
    ratingrbg: [
      {
      date: { type: Date },
      rating: { type: Number}
    }
  ],
    winsrbg: Number,
    lossrbg: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Player2", playerSchema);
