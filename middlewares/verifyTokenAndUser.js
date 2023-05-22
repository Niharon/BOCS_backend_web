const jwt = require("jsonwebtoken");

const verifyTokenAndUser = async (req, res, next) => {

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
        req.user = decoded;
        next();

        // here needs to call next for proceed
    }
    catch (err) {
        return res.status(401).json({
            success: false,
            message: err?.message || "Invalid token",
        });
    }


        

}

module.exports = verifyTokenAndUser;