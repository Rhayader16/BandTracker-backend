const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Favourite = require("../models/Favourite.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.use(isAuthenticated);

//Here we get all the favourites of a user
router.get("/", isAuthenticated, (req, res, next) => {
  Favourite.find({ user: req.userId })
    .populate("artist")
    .then((allFavourites) => {
      res.status(200).json(allFavourites);
    })
    .catch((error) => {
      next(error);
    });
});

//Here we create a favourite
router.post("/:artistId", isAuthenticated, (req, res, next) => {
  Favourite.create({
    user: req.userId,
    artist: req.params.artistId,
  })
    .then((createNewFavourite) => {
      res.json(createNewFavourite);
    })
    .catch((error) => {
      next(error);
    });
});

//Here we have the possibility to erase a favourite, a feature for the future
router.delete("/:artistId", isAuthenticated, (req, res, next) => {
  Favourite.findOneAndDelete({ artist: req.params.artistId, user: req.userId })
    .then(() => {
      res.status(204).send();
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
