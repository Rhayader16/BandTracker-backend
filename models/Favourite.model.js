const { Schema, model } = require("mongoose");

const favouriteSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
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

const Favourite = model("Favourite", favouriteSchema);

module.exports = Favourite;
