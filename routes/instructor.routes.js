const express = require("express");
const instructorController = require("../controller/admin/instructor.controller");

const router = express.Router();




// instrctors routes

router.get("/",instructorController.getAllInstructors);




module.exports = router;