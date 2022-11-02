const router = require("express").Router();
const ParkingCtrl = require("../Controllers/ParkingLotController");


router.post("/create", ParkingCtrl.createParkingLot);
router.put("/update/:id", ParkingCtrl.updateParkingLot);
router.put("/update/slot/:id", ParkingCtrl.updateSlot);
router.delete("/delete/:id", ParkingCtrl.deleteParkingLot);
router.get("/search", ParkingCtrl.searchParkingLot);
router.get("/get/:id", ParkingCtrl.getParkingLot);
router.put("/updateSlot/:id", ParkingCtrl.updateFloorInSlots);
router.put("/update/slot/vehicle/:id", ParkingCtrl.updateFloorInSlots);
router.get("/getSlots", ParkingCtrl.searchAllSlots);


module.exports = router;
