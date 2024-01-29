const Art = require("../models/Art");
const User = require("../models/User")
getAllArts = async (req, res) => {
  try {
    const arts = await Art.find();
    res.json(arts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch Arts" });
  }
};

getArtById = async (req, res) => {
  const { id } = req.params;
  try {
    const art = await Art.findById(id);
    if (!art) {
      return res.status(404).json({ error: "Art not found" });
    }
    res.json(art);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch Art" });
  }
};

createArt = async (req, res) => {
  const artData = req.body.art;
  try {
    const newArt = await Art.create(artData);

    // Add the new art to the user
    const userId = req.body.userId; // Assuming userId is passed in the request body
    const user = await User.findById(userId);
    user.ratedArt.push(newArt._id);
    await user.save();

    res.status(201).json({ message: "Art created successfully", art: newArt });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to create Art" });
  }
};

updateArt = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedArt = await Art.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedArt) {
      return res.status(404).json({ error: "Art not found" });
    }
    res.json({ message: "Art updated successfully", art: updatedArt });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to update Art" });
  }
};

deleteArt = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedArt = await Art.findByIdAndDelete(id);
    if (!deletedArt) {
      return res.status(404).json({ error: "Art not found" });
    }
    res.json({ message: "Art deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete Art" });
  }
};

module.exports = {
  getAllArts,
  getArtById,
  createArt,
  deleteArt,
  updateArt,
};
