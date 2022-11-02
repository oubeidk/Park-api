const mongoose = require("mongoose");
const FloorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  numOfFloors: {
    type: Number,
    required: [true],
  },
  slots_number: {
    type: Number,
    required: [true],
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("floors", FloorSchema);
