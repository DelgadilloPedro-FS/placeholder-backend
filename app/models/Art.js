const { default: mongoose } = require("mongoose");

const artSchema = new mongoose.Schema({
  artId: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Art", artSchema);
