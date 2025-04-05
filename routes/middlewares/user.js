const jwt = require("jsonwebtoken");
const {JWT_USER_SECRET}= require("../config")

function userMiddleware(req,res,next){
    const token = req.headers.token;
    const verification = jwt.verify(token,JWT_USER_SECRET);

    if(verification){
        req.userId=verification.id;
        next();
    }
    else{
        res.status(403).json({
            message:"You are not logged in"
        })
        return
    }
    
}

module.exports={
    userMiddleware:userMiddleware
}