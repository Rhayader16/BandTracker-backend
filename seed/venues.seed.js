require("dotenv").config();
require("./../db");
const Venue = require("./../models/Venue.model");
const data = require("./bandtracker.venues.json");

(async function () {
  try {
    for (const venue of data) {
      const oneVenue = {
        artist: "655365305733b6cd5b56dc9e",
        venue: venue.venue,
        city: venue.city,
        address: venue.address,
        date: venue.date,
        coordinates: venue.coordinates,
      };
      const createdVenue = await Venue.create(oneVenue);
      venue.venue = createdVenue._id;
      await Venue.updateOne({ _id: venue._id }, venue);
    }
  } catch (error) {
    console.log(error);
  } finally {
    process.exit();
  }
})();
