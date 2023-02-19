const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes");
require("dotenv").config();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use(router);
const DBURI = "mongodb+srv://admin:admin@hackathon-mern.kltiyvp.mongodb.net/Hackathon";

mongoose
  .connect(DBURI)
  .then((res) => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB error", err));

app.listen(PORT, () =>
  console.log(`Server is success full running on : http://localhost:${PORT}`)
);
