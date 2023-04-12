const express = require("express");
const courseController = require("../../controller/admin/course.controller");

const router = express.Router();
// import the controller


router.post("/course/create", courseController.create);
router.patch("/course/:id", courseController.update);
router.delete("/course/:id", courseController.delete);


module.exports = router;