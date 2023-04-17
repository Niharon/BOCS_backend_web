const express = require("express");
// index of routes
const router = express.Router();

// import the controller


router.use("/user", require("./user.routes"));

router.use("/course", require("./user.routes"));





module.exports = router;