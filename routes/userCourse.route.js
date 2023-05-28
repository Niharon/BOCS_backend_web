const express = require("express");
const router = express.Router();

router.get("/:id",(req,res)=>{
    res.json({
        message: "hello from user course route",
    
    })
})


module.exports = router;