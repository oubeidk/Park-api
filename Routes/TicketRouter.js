const router = require("express").Router();
const TicketCtrl = require("../Controllers/TicketController");

router.post("/create", TicketCtrl.createTicket);
router.get("/find", TicketCtrl.getTickets);

module.exports = router;
