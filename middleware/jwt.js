require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
  const accessToken = sign(
    { id: user.id, name: user.name },
    process.env.JWT_SECRET,
    {
      expiresIn: "1hr",
    }
  );
  return accessToken;
};

const validateTokens = (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  if (!accessToken) {
    return res.status(400).json({ msg: "User not authenticated" });
  }
  try {
    const valideToken = verify(accessToken, process.env.JWT_SECRET);
    if (valideToken) {
      req.authenticated = true;
      return next();
    }
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

module.exports = { createTokens, validateTokens };
