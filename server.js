require("dotenv").config();
const express = require("express");
const app = express();
const logger = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = process.env.PORT;

app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(require("./routes/index"));
app.listen(port, () => {
  console.log(`listenning on port ${port}`);
});
