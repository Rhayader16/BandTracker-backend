const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Favourite = require("../models/Favourite.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.use(isAuthenticated);

router.get("/", (req, res, next) => {
  Favourite.find()
    .populate("artist")
    .then((allFavourites) => {
      res.status(200).json(allFavourites);
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/", (req, res, next) => {
  const newFavourite = { ...req.body };
  Favourite.create(newFavourite)
    .then((createNewFavourite) => {
      res.json(createNewFavourite);
    })
    .catch((error) => {
      next(error);
    });
});

router.delete("/", (req, res, next) => {
  Favourite.findByIdAndDelete(req.params.favouriteId)
    .then(() => {
      res.status(204).send();
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
