const mongoose = require("mongoose");
const TicketSchema = new mongoose.Schema({
  slot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SlotModel",
  },
  name: {
    type: String,
    required: [true],
  },
  type: {
    type: String,
    required: [true],
    enum: ["Car", "Bike", "Truck"],
  },

  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("tickets", TicketSchema);
