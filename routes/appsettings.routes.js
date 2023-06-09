const express = require("express");
const GeneralSettings = require("../models/GeneralSettings.model");

const router = express.Router();

// course api
// base url: /api/app

router.get("/version", async (req, res, next) => {
    try {

        // get the last object from GeneralSettings
        const settings = await GeneralSettings.findOne({
            order: [['id', 'DESC']] // Assuming 'id' is the primary key column
        });
        res.json({
            android_version: settings?.android_version || "1.0.0",
            ios_version: settings?.ios_version || "1.0.0"
        })

    } catch (e) {
        next(e)
    }


})

module.exports = router;