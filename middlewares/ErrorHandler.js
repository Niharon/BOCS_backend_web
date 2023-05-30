const ErrorHandler = (err, req, res, next) => {
    // console.log(err?.message)
    let msg = err?.message || "Something went wrong";

    if(err?.name === "SequelizeUniqueConstraintError"){
       
        msg = err?.errors[0]?.message;
    }
    // console.log(msg)
  
    const statusCode = err.statusCode || 400;
    res.status(statusCode);
    res.json({
        success: false,
        message: msg,
        error:err
        // stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};
module.exports = ErrorHandler;