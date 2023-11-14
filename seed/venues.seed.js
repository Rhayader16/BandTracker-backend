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

      // Aggiorna l'ID del campo venue nel tuo documento originale
      venue.venue = createdVenue._id;

      // Ora puoi creare o aggiornare il documento originale con il nuovo ID venue
      await Venue.updateOne({ _id: venue._id }, venue);
    }
  } catch (error) {
    console.log(error);
  } finally {
    process.exit();
  }
})();
