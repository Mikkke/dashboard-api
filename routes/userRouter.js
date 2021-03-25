const userRouter = require("express").Router();

userRouter.post("/register", (req, res) => {});
userRouter.post("/login", (req, res) => {});
userRouter.get("/getprofil", (req, res) => {
  res.send("good from api");
});

module.exports = userRouter;
