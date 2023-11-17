const router = require("express").Router();
const Artist = require("./../models/Artist.model");
const { isAdmin, isAuthenticated } = require("./../middleware/jwt.middleware");
const Venue = require("../models/Venue.model");
const Album = require("../models/Album.model");

//finds all artists
router.get("/", (req, res, next) => {
  Artist.find()
    .then((allArtists) => {
      res.status(200).json(allArtists);
    })

    .catch((error) => {
      next(error);
    });
});

router.use(isAuthenticated);

//create a new artist
router.post("/", isAdmin, (req, res, next) => {
  const newArtist = { ...req.body };
  Artist.create(newArtist)
    .then((createNewArtist) => {
      res.json(createNewArtist);
    })
    .catch((error) => {
      next(error);
    });
});

//gets all the info about one artist
router.get("/:artistId", async (req, res, next) => {
  const { artistId } = req.params;
  try {
    const oneArtist = await Artist.findById(artistId);
    const allVenuesOfArtist = await Venue.find({ artist: artistId });
    const allAlbums = await Album.find({ artist: artistId });
    res.json({ oneArtist, allVenuesOfArtist, allAlbums });
  } catch (error) {
    next(error);
  }
});

//deletes an artist
router.delete("/:artistId", isAdmin, (req, res, next) => {
  Artist.findByIdAndDelete(req.params.artistId)
    .then(() => {
      res.status(204).send();
    })
    .catch((error) => {
      next(error);
    });
});

//updates an artist
router.put("/:artistId", isAdmin, (req, res, next) => {
  Artist.findByIdAndUpdate(req.params.artistId, req.body, { new: true })
    .then((updatedArtist) => {
      res.json(updatedArtist);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
