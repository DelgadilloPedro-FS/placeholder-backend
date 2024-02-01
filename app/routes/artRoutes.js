const router = require("express").Router();
const {
  getAllArts,
  getArtById,
  createArt,
  deleteArt,
  updateArt,
} = require("../controllers/artController");

router.get("/", getAllArts);
router.post("/", createArt);
router.get("/:id", getArtById);
router.delete("/:id", deleteArt);
router.put("/:id", updateArt);

module.exports = router;
