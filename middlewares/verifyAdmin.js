const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const verifyAdmin = async (req, res, next) => {

    const token = req.headers.authorization?.split(" ")[1];
    // console.log(token);
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token not found",
        });
    }
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
        if (decoded.id) {
            const user = await User.findOne({ where: { id: decoded.id } },
                { attributes: ["id", "role", "name", "email"] });
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid token",
                });
            }
            if (user.role !== "admin") {
                return res.status(401).json({
                    success: false,
                    message: "You are not authorized to access this route",
                });
            }
            if (user.role === "admin") {
                req.user = user;
                next();
            }
        }
        else {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
            });
        }
        // if (decoded.role !== "admin") {
        //     return res.status(401).json({
        //         success: false,
        //         message: "You are not authorized to access this route",
        //     });
        // }
        // req.user = decoded;
        // next();

        // here needs to call next for proceed
    }
    catch (err) {
        return res.status(401).json({
            success: false,
            message: err?.message || "Invalid token",
        });
    }




}

module.exports = verifyAdmin;