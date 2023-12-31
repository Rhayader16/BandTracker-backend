const express = require("express");
const router = express.Router();
const { isAuthenticated, isAdmin } = require("./../middleware/jwt.middleware");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", require("./auth.routes"));

router.use("/concerts/artist", require("./concerts.routes"));
router.use("/favourites", require("./favourites.routes"));
router.use("/artists", require("./artists.routes"));
router.use("/concerts", require("./concerts.routes"));
router.use("/albums", require("./albums.routes"));

module.exports = router;
