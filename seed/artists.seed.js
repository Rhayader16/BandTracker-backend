require("dotenv").config();
require("./../db");
const Artist = require("./../models/Artist.model");
const Album = require("./../models/Album.model");
const data = require("./bandtracker.artists.json");
(async function () {
  try {
    for (const artist of data) {
      const oneArtist = {
        name: artist.name,
        genre: artist.genre,
        photo: artist.photo,
      };
      const createdArtist = await Artist.create(oneArtist);
      const updatedAlbums = artist.album.map((album) => {
        return { ...album, artist: createdArtist._id };
      });
      await Album.create(updatedAlbums);
    }
  } catch (error) {
    console.log(error);
  } finally {
    process.exit();
  }
})();
