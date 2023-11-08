const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});
router.use("/artists", require("./artists.routes"));
router.use("/concerts", require("./concerts.routes"));

module.exports = router;
