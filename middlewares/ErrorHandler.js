const ErrorHandler = (err, req, res, next) => {
    // console.log(err)
    const statusCode = err.statusCode || 500;
    res.status(statusCode);
    res.json({
        success: false,
        message: err?.message,
        // stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};
module.exports = ErrorHandler;