const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to mongodb");
  }
);

app.use("/parking", require("./Routes/ParkingLotRouter"));
app.use("/vehicle", require("./Routes/VehicleRouter"));
app.use("/floor", require("./Routes/FloorRouter"));
app.use("/slot", require("./Routes/SlotRouter"));
app.use("/ticket", require("./Routes/TicketRouter"));

app.listen(3000, () => console.log("server is runnig"));
