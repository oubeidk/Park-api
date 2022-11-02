const Floor = require("../Models/FloorsModel");

module.exports = {
  getAllFloors: (req, res) => {
    try {
      Floor.find({}).then((floor) => {
        res.json(floor);
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
  getFloor: async (req, res) => {
    try {
      Floor.find({ _id: req.params.id }).then((floor) => {
        res.json(floor);
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },

  //create floors
  createFloors: async (req, res, next) => {
    try {
      const FloorData = {
        name: req.body.name,
        numOfFloors: req.body.numOfFloors,
        slots_number: req.body.slots_number,
      };
      const floor = await Floor.create(FloorData);
      return res.status(200).json({
        success: true,
        data: floor,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  },
  updateFloor: async (req, res) => {
    Floor.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      (err, floor) => {
        if (!floor) {
          res.status(500).json({
            message: "floor is not updated" + err,
            data: null,
          });
        } else {
          res.status(200).json({
            message: " floor is successfully updated",
            data: floor,
          });
        }
      }
    );
  },
};
