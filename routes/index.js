const express = require("express");
// index of routes
const router = express.Router();

// import the controller

router.use("/user", require("./user.routes"));

router.use("/courses", require("./course.routes"));


router.get("/", (req, res) => {

    res.json({
        routes:
        router.stack.map((r) => {
            console.log("gi")
            if (r.route && r.route.path) {
                return r;
            }
        })
    })
    
});


module.exports = router;