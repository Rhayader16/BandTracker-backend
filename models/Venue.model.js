const { Schema, model } = require("mongoose");

const venueSchema = new Schema(
  {
    artist: { type: Schema.Types.ObjectId, ref: "Artist", required: true },
    venue: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    date: { type: Date, required: true },
    coordinates: [Number],
  },
  {
    timestamps: true,
  }
);

const Venue = model("Venue", venueSchema);
module.exports = Venue;
