const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
// index of routes
const router = express.Router();

// import the controller

router.use("/user", require("./user.routes"));

// course related all routes
router.use("/courses", require("./course.routes"));
// course access related all routes
router.use("/user-course", verifyToken, require("./userCourse.route"));


router.use("/instructors", require("./instructor.routes"));


router.get("/", (req, res) => {

   res.json({
         message: "hello from api root",
            application_mode: process.env.NODE_ENV,
   })
    
});


module.exports = router;