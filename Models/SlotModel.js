const mongoose = require("mongoose");
const SlotSchema = new mongoose.Schema({
  numOfSlot: {
    type: Number,
    required: [true],
  },

  slotType: {
    type: String,
    enum: ["Car", "Truck", "Bike"],
    default: "Car",
  },
  available: {
    type: Boolean,
    default: true,
  },
  floor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FloorsModel",
  },

  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("slots", SlotSchema);
