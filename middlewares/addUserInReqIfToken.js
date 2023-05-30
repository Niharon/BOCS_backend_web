const jwt = require("jsonwebtoken");

const addUserInReqIfToken = async (req, res, next) => {
    try{

        const token = req.headers.authorization?.split(" ")[1];
        // console.log(token);
        if(token){
            const user = jwt.verify(token, process.env.JWT_SECRET);
            req.user = user;
            
        }
        
        next();
    }
    catch(er){
        next();
    }
        

}

module.exports = addUserInReqIfToken;