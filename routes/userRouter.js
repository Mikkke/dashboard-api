const userRouter = require("express").Router();
const bcryp = require("bcrypt");
const { User } = require("../models");
const { v4: uuid } = require("uuid");
const { createTokens, validateTokens } = require("../middleware/jwt");

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
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userExist = await User.findOne({ where: { email: email } });
  if (!userExist) {
    res.status(400).json({ msg: "not user with that email" });
  }
  const dbPassword = userExist.password;
  const comparePassword = await bcryp.compare(password, dbPassword);
  if (!comparePassword) {
    res.status(400).json({ msg: "wrong email or password" });
  } else {
    const accessToken = createTokens(userExist);
    res.cookie("access-token", accessToken, { maxAge: 60 * 60 });
    res.json({ msg: "you are logged in" });
  }
});

userRouter.get("/getprofil", (req, res) => {
  res.send("good from api");
});

module.exports = userRouter;
