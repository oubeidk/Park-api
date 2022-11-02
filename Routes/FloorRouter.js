const router = require("express").Router();
const FloorCtrl = require("../Controllers/FloorController");

router.post("/create", FloorCtrl.createFloors);
router.get("/find_all", FloorCtrl.getAllFloors);
router.get("/find_one/:id", FloorCtrl.getFloor);
router.put("/update/:id", FloorCtrl.updateFloor);

module.exports = router;
