const Slot = require("../Models/SlotModel");
const Floor = require("../Models/FloorsModel");
const Ticket = require("../Models/TicketModel");

module.exports = {
  getAllSlots: (req, res) => {
    try {
      Slot.find({})
        .populate({
          path: "floor",

          model: Floor,
        })
        .then((slot) => {
          res.json(slot);
        });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
  getSlot: async (req, res) => {
    try {
      Slot.find({ _id: req.params.id }).then((slot) => {
        res.json(slot);
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },

  //create slots
  createSlots: async (req, res) => {
    const { numOfSlot, slotType, available, floor } = req.body;
    try {
      const slots = await Slot.findOne({ numOfSlot });
      if (slots) throw Error("the same slots number already exist");

      const newSlot = new Slot({ numOfSlot, slotType, available, floor });

      const savedSlots = await newSlot.save();

      if (!savedSlots) throw Error("Something went wrong saving the parking");

      res.status(200).json({
        slots: savedSlots,
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
  updateSlot: async (req, res) => {
    Slot.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      (err, slot) => {
        if (!slot) {
          res.status(500).json({
            message: "slot is not updated" + err,
            data: null,
          });
        } else {
          res.status(200).json({
            message: " slot is successfully updated",
            data: slot,
          });
        }
      }
    );
  },
  getAvailbleSlots: async (req, res) => {
    try {
      const AvailableSlots = [
        {
          $match: {
            $and: [{ available: true }, { slotType: req.body.slotType }],
          },
        },
        {
          $group: {
            _id: { floor_number: "$floor" },
            free_slots: { $sum: 1 },
          },
        },
      ];
      Slot.aggregate(AvailableSlots).exec(function (err, freeslots) {
        Floor.populate(
          freeslots,
          { path: "_id" },
          function (err, populatedFloors) {
            const AvailableVehiculeTypeSlotsByFloor = populatedFloors;
            if (!AvailableVehiculeTypeSlotsByFloor) {
              res.status(500).json({
                message: "no available slot for that SlotType ",
                data: null,
              });
            } else {
              res.status(200).json({
                success: true,
                data: AvailableVehiculeTypeSlotsByFloor,
              });
            }
          }
        );
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
  getSlotsByFloorID: async (req, res) => {
    await Slot.find({ floor: req.params.floor })
      .then((slots) => res.status(200).json({ success: true, data: slots }))
      .catch((err) =>
        res.status(500).json({ success: false, err: "Server Error" })
      );
  },
  getFirstAvailbleSlot: async (req, res) => {
    try {
      const FirstAvailableSlot = [
        {
          $match: {
            $and: [{ available: true }, { slotType: req.body.slotType }],
          },
        },
        {
          $group: {
            _id: { floor_number: "$floor" },
            first_free_slot_id: { $first: "$_id" },
            first_free_slot: { $first: "$number" },
            first_free_slot_floor: { $first: "$floor" },
          },
        },
      ];

      Slot.aggregate(FirstAvailableSlot).exec(function (err, firstfreeslots) {
        Floor.populate(
          firstfreeslots,
          { path: "_id" },
          function (err, populatedFloors) {
            const FirstAvailableVehiculeTypeSlot = populatedFloors;
            return res.status(200).json({
              success: true,
              data: FirstAvailableVehiculeTypeSlot,
            });
          }
        );
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  },

  parcVehicule: async (req, res, next) => {
    try {
      const TicketData = {
        slot: req.body.slot,
        vehicule: req.body.vehicule,
      };
      const slot = await Slot.findone(req.body.slot);
      if (!slot) {
        return res.status(404).json({ success: false, error: "No Slot found" });
      } else {
        slot.available = false;
        slot
          .save()
          .then(() => {
            const ticket = Ticket.create(TicketData);
            return res.status(200).json({
              success: true,
              data: ticket,
            });
          })

          .catch((err) => res.status(400).json(err));
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        error: err,
      });
    }
  },
  UnparcVehicule: async (req, res, next) => {
    try {
      const ticket = await Ticket.findById(req.params.idTicket);
      if (!ticket) {
        return res
          .status(404)
          .json({ success: false, error: "No Ticket found" });
      } else {
        const slot = await Slot.findById(ticket.slot);

        slot.availablity = true;
        slot
          .save()
          .then((slot) => console.log(slot))

          .catch((err) => res.status(400).json(err));
      }

      await ticket.remove();
      return res.status(200).json({
        success: true,
        data: {},
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  },
};
