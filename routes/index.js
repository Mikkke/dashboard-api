const router = require("express").Router();

router.use("/api", require("./userRouter"));

module.exports = router;
