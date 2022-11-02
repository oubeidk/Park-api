const router = require("express").Router();
const VehicleCtrl = require("../Controllers/VehiculeCotroller");

router.post("/create", VehicleCtrl.createVehicle);

module.exports = router;
