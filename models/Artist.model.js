const { Schema, model } = require("mongoose");

const artistSchema = new Schema(
  {
    name: { type: String, required: true },
    genre: {
      type: String,
      enum: [
        "Rock",
        "Pop,",
        "Metal",
        "Indie",
        "Alternative",
        "Hip Hop",
        "Jazz",
        "Blues",
        "Rap",
        "Soul",
        "R&B",
      ],
      required: true,
    },
    album: [{ name: String, year: Date, picture: String }],
    concertDate: { type: Date, required: true },
    photo: { type: String },
  },
  {
    timestamps: true,
  }
);

const Artist = model("Artist", artistSchema);
module.exports = Artist;
