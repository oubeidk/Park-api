const mongoose = require("mongoose");
const ParkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true],
  },

  floors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "FloorsModel",
  }],

  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("parkings", ParkSchema);
