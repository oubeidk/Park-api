const Parking = require("../Models/ParkingLotModel");
const Floor = require("../Models/FloorsModel");
const Slot = require("../Models/SlotModel");
const FloorsModel = require("../Models/FloorsModel");
const SlotModel = require("../Models/SlotModel");

module.exports = {
  updateFloorInSlots: async (req, res) => {
    Slot.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      (err, slot) => {
        if (!slot) {
          res.status(500).json({
            message: "floor is not updated" + err,
          });
        } else {
          res.status(200).json({
            message: " is successfully updated",
          });
        }
      }
    );
  },
  updateSlot: async (req, res) => {
    Slot.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      (err, slot) => {
        if (!slot) {
          res.status(500).json({
            message: "slot is not updated" + err,
            // data: null,
          });
        } else {
          res.status(200).json({
            message: " is successfully updated",
            // data: null,
          });
        }
      }
    );
  },
  updateVehicleInSlot: async (req, res) => {
    const status = req.body;
    Slot.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { status: "OCCUPIED" } },

      (err, slot) => {
        if (!slot) {
          res.status(500).json({
            message: "slot is not updated" + err,
            // data: null,
          });
        } else {
          res.status(200).json({
            message: " is successfully updated",
          });
        }
      }
    );
  },
  //create ParkingLot
  createParkingLot: async (req, res) => {
    const { name, floors } = req.body;

    if (!name || !floors) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    try {
      const parking = await Parking.findOne({ name });
      if (parking) throw Error("parking already exists");

      const newParking = new Parking({ name, floors });

      const savedParking = await newParking.save();

      if (!savedParking) throw Error("Something went wrong saving the parking");

      res.status(200).json({
        Parking: savedParking,
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
  updateParkingLot: async (req, res) => {
    Parking.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      (err, parking) => {
        if (!parking) {
          res.status(500).json({
            message: "parking is not updated" + err,
            // data: null,
          });
        } else {
          res.status(200).json({
            message: " is successfully updated",
            // data: null,
          });
        }
      }
    );
  },
  deleteParkingLot: async (req, res) => {
    Parking.findByIdAndDelete(
      { _id: req.params.id },
      { $set: req.body },
      (err, parking) => {
        if (!parking) {
          res.status(500).json({
            message: "parking is not deleted" + err,
          });
        } else {
          res.status(200).json({
            message: "parking is successfully deleted",
          });
        }
      }
    );
  },

  getParkingLot: async (req, res) => {
    try {
      Parking.find({ _id: req.params.id })

        .populate({
          path: "floors",

          model: FloorsModel,
          populate: { path: "slots", model: SlotModel },
        })
        .then((parking) => {
          res.json(parking);
        });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
  searchAllSlots: (req, res) => {
    try {
      Parking.find({}, { slots: 1 })
        .populate({
          path: "slots",

          model: SlotModel,
        })
        .then((parking) => {
          res.json(parking);
        });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
  searchParkingLot: (req, res) => {
    try {
      Parking.find({}).then((parking) => {
        res.json(parking);
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
};
