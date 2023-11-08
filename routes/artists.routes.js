const router = require("express").Router();
const Artist = require("./../models/Artist.model");
// const {isAdmin} = require("./../middleware/authentication");

router.get("/", (req, res, next) => {
  Artist.find()
    .then((allArtists) => {
      res.status(200).json(allArtists);
    })

    .catch((error) => {
      next(error);
    });
});
router.post("/", (req, res, next) => {
  const newArtist = { ...req.body };
  Artist.create(newArtist)
    .then((createNewArtist) => {
      res.json(createNewArtist);
    })
    .catch((error) => {
      next(error);
    });
});
router.get("/:artistId", async (req, res, next) => {
  const { artistId } = req.params;
  try {
    const oneArtist = await Artist.findById(artistId);
    res.json(oneArtist);
  } catch (error) {
    next(error);
  }
});
router.delete("/:artistId", (req, res, next) => {
  Artist.findByIdAndDelete(req.params.artistId)
    .then(() => {
      res.status(204).send();
    })
    .catch((error) => {
      next(error);
    });
});
router.put("/:artistId", (req, res, next) => {
  Artist.findByIdAndUpdate(req.params.artistId, req.body, { new: true })
    .populate("venue")
    .then((updatedArtist) => {
      res.json(updatedArtist);
    })
    .catch((error) => {
      next(error);
    });
});
module.exports = router;
