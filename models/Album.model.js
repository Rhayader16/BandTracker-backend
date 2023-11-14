const { Schema, model } = require("mongoose");

const albumSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    year: Number,
    picture: String,
    artist: {
      type: Schema.Types.ObjectId,
      ref: "Artist",
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Album = model("Album", albumSchema);

module.exports = Album;
