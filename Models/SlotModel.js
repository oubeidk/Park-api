const mongoose = require("mongoose");
const SlotSchema = new mongoose.Schema({
  numOfSlot: {
    type: Number,
    required: true,
    unique: true,
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
SlotSchema.pre("validate", function (next) {
  var doc = this;

  Slot.findOne({}, null, { sort: { numOfSlot: -1 } }, function (error, latest) {
    if (error) return next(error);
    if (!latest) {
      doc.numOfSlot = 1;
    } else {
      doc.numOfSlot = latest.numOfSlot + 1;
    }
    next();
  });
});

module.exports = Slot = mongoose.model("slots", SlotSchema);
