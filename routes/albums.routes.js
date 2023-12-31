const router = require("express").Router();
const Album = require("./../models/Album.model");
const { isAdmin, isAuthenticated } = require("./../middleware/jwt.middleware");

router.use(isAuthenticated, isAdmin);

//creates a new album
router.post("/:artistId", (req, res, next) => {
  const newAlbum = { ...req.body, artist: req.params.artistId };
  Album.create(newAlbum)
    .then((createdAlbum) => {
      res.json(createdAlbum);
    })
    .catch((error) => {
      next(error);
    });
});

//get one album
router.get("/:albumId", async (req, res, next) => {
  const { albumId } = req.params;
  try {
    const oneAlbum = await Album.findById(albumId);
    res.json(oneAlbum);
  } catch (error) {
    next(error);
  }
});

//delete an album
router.delete("/:albumId", (req, res, next) => {
  Album.findByIdAndDelete(req.params.albumId)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((error) => {
      next(error);
    });
});

//update an album
router.put("/:albumId", (req, res, next) => {
  Album.findByIdAndUpdate(req.params.albumId, req.body, { new: true })
    .then((updatedAlbum) => {
      res.json(updatedAlbum);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
