const express = require("express");
// index of routes
const router = express.Router();

// import the controller

router.use("/user", require("./user.routes"));

router.use("/courses", require("./course.routes"));
router.use("/instructors",require("./instructor.routes"));


router.get("/", (req, res) => {

   res.json({
         message: "hello from api root",
            application_mode: process.env.NODE_ENV,
   })
    
});


module.exports = router;