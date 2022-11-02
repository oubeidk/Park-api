const Vehicule = require("../Models/VehiculeModel");

module.exports = {
  createVehicle: async (req, res) => {
    const { name, type, marque } = req.body;
    try {
      const vehicule = await Vehicule.findOne({ name, type, marque });
      if (vehicule) throw Error("the same slots Type already exist");

      const newVehicule = new Vehicule({ name, type, marque });

      const savedVehicule = await newVehicule.save();

      if (!savedVehicule) throw Error("Something went wrong saving the vehicle");

      res.status(200).json({
        vehicule: savedVehicule,
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
};
