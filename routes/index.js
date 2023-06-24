const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyAdmin");
// index of routes
const router = express.Router();


// BASE URL: /api

// general settings route
router.use("/app", require("./appsettings.routes"));

// authentication routes
router.use("/user", require("./user.routes"));
// course related all routes
router.use("/courses", require("./course.routes"));
// course access related all routes
router.use("/user-course", verifyToken, require("./userCourse.routes"));
// admin routes
router.use("/admin", verifyAdmin, require("./admin/admin.routes"));



router.use("/instructors", require("./instructor.routes"));


router.get("/", (req, res) => {

   res.json({
      message: "hello from api root",
      application_mode: process.env.NODE_ENV,
   })

});


module.exports = router;