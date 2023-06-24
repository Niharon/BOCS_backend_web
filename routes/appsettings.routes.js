const express = require("express");
const GeneralSettings = require("../models/GeneralSettings.model");

const router = express.Router();

// course api
// base url: /api/app

router.get("/version", async (req, res, next) => {
    try {

        // get the last object from GeneralSettings
        const settings = await GeneralSettings.findOne({}).sort({ created_at: -1 }).limit(1);
        res.json({
            version: settings?.version || "1.0.0"
        })

    } catch (e) {
        next(e)
    }


})

module.exports = router;