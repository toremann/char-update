const mongoose = require("mongoose");

const rating2v2Schema = new mongoose.Schema({
  rating2v2: Number,
},
{
  timestamps: true,
}
)

const rating3v3Schema = new mongoose.Schema({
  rating3v3: Number,
},
{
  timestamps: true,
}
)

const ratingrbgSchema = new mongoose.Schema({
  ratingrbg: Number,
},
{
  timestamps: true,
}
)

const playerSchema = new mongoose.Schema(
  {
    player: String,
    realm: String,
    class: Number,
    ilvl: Number,
    rating2v2: rating2v2Schema,
    wins2v2: Number,
    loss2v2: Number,
    rating3v3: rating3v3Schema,
    wins3v3: Number,
    loss3v3: Number,
    ratingrbg: ratingrbgSchema,
    winsrbg: Number,
    lossrbg: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Player2", playerSchema);
