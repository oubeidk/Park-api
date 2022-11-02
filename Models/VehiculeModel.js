const mongoose = require("mongoose");
const VehiculeSchema = new mongoose.Schema({
 name: {
    type: String,
    required: [true],
  },

  type: {
    type: String,
    enum: ["Car", "Bike", "Truck"],
    default: "Car",
  },
  marque: {
    type: String,
    required: [true],
  },

  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("vehicules", VehiculeSchema);
