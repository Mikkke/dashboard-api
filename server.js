require("dotenv").config();
const express = require("express");
const app = express();
const logger = require("morgan");
const cors = require("cors");
const port = process.env.PORT;

app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/", (req, res) => {
  res.send("yep");
});
app.listen(port, () => {
  console.log(`listenning on port ${port}`);
});
