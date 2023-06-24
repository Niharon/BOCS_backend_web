const GeneralSettings = require("../../models/GeneralSettings.model");

exports.getGeneralSettings = async (req, res) => {
    try {
        // get the last record
        const generalSettings = await GeneralSettings.findOne({
            order: [["id", "DESC"]],
        });
        res.status(200).json({
            message: "General settings fetched successfully",
            data: generalSettings,
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
}

exports.updateGeneralSettings = async (req, res) => {
    try{
        const res = await GeneralSettings.update(req.body, {where: {id: req.params.id}});
        res.status(200).json({
            message: "General settings updated successfully",
            data: res,
        });

    }catch(error){
        next(error)
    }
}