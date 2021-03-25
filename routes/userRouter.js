const userRouter = require("express").Router();
const bcryp = require("bcrypt");
const { User } = require("../models");
const { v4: uuid } = require("uuid");

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcryp.hash(password, 10);
    const newUser = await User.create({
      id: uuid(),
      name: name,
      email: email,
      password: hashedPassword,
    });
    res.status(201).json({ msg: "User registered" });
  } catch (error) {
    console.log("error :>> ", error);
    res.status(400).json({ msg: error });
  }
});
userRouter.post("/login", (req, res) => {});
userRouter.get("/getprofil", (req, res) => {
  res.send("good from api");
});

module.exports = userRouter;
