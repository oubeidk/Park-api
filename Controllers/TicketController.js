const FloorsModel = require("../Models/FloorsModel");
const SlotModel = require("../Models/SlotModel");
const Ticket = require("../Models/TicketModel");

module.exports = {
  createTicket: async (req, res) => {
    const { slot, name, type } = req.body;
    try {
      const newTicket = new Ticket({ slot, name, type });

      const savedTicket = await newTicket.save();

      if (!savedTicket) throw Error("Something went wrong saving the ticket");

      res.status(200).json({
        ticket: savedTicket,
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
  getTickets: async (req, res) => {
    try {
      Ticket.find({})
        .populate({
          path: "slot",

          model: SlotModel,
        })
        .then((ticket) => {
          res.json(ticket);
        });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
};
