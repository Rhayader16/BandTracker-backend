const router = require("express").Router();
const Venue = require("./../models/Venue.model");
const { isAdmin, isAuthenticated } = require("./../middleware/jwt.middleware");

router.post("/:artistId", isAuthenticated, isAdmin, (req, res, next) => {
  const artist = req.params.artistId;
  const newVenue = {
    artist,
    venue: req.body.venue,
    city: req.body.city,
    address: req.body.address,
    date: req.body.date,
  };
  Venue.create(newVenue)
    .then((createNewVenue) => {
      res.json(createNewVenue);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/", isAuthenticated, (req, res, next) => {
  Venue.find()
    .then((allVenues) => {
      res.status(200).json(allVenues);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/:artistId", isAuthenticated, (req, res, next) => {
  const artistId = req.params.artistId;

  Venue.find({ artist: artistId })
    .then((allConcerts) => {
      res.status(200).json(allConcerts);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/venue/:concertId", async (req, res, next) => {
  const { concertId } = req.params;
  try {
    const oneConcert = await Venue.findById(concertId);
    res.json(oneConcert);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
