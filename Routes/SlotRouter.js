const router = require("express").Router();
const SlotCtrl = require("../Controllers/SlotController");

router.post("/create", SlotCtrl.createSlots);
router.get("/find_all", SlotCtrl.getAllSlots);
router.get("/find/:floor", SlotCtrl.getSlotsByFloorID);
router.get("/find_one/:id", SlotCtrl.getSlot);
router.put("/update/:id", SlotCtrl.updateSlot);
router.post("/free-slots", SlotCtrl.getAvailbleSlots);
router.post("/first-free-slots", SlotCtrl.getFirstAvailbleSlot);
router.post("/park-vehicule", SlotCtrl.parcVehicule);
router.delete("/park-vehicule/:idTicket", SlotCtrl.UnparcVehicule);

module.exports = router;
