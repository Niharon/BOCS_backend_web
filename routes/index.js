const express = require("express");
// index of routes
const router = express.Router();

// import the controller

router.use("/user", require("./user.routes"));

router.use("/courses", require("./course.routes"));

router.get("/", (req, res) => {
    res.send("Hello World");
});





module.exports = router;