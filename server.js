const express = require("express");
const app = express();
const port = 8080;

app.use("/", (req, res) => {
  res.send("yep");
});
app.listen(port, () => {
  console.log(`listenning on port ${port}`);
});
