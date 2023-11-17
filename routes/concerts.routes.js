const router = require("express").Router();
const Venue = require("./../models/Venue.model");
const { isAdmin, isAuthenticated } = require("./../middleware/jwt.middleware");

//Here we take the info on the artist and we create a concert
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

//Here we get all the concerts availables but I didn't create the page yet
router.get("/", isAuthenticated, (req, res, next) => {
  Venue.find()
    .then((allVenues) => {
      res.status(200).json(allVenues);
    })
    .catch((error) => {
      next(error);
    });
});

//here we get all the concerts of a single artist
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

//Here we get one single concert of one artist (I populate the db entry with the info from the artist)
router.get("/venue/:concertId", async (req, res, next) => {
  const { concertId } = req.params;
  try {
    const oneConcert = await Venue.findById(concertId).populate("artist");
    res.json(oneConcert);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
