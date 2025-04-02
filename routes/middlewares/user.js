const jwt = require("jsonwebtoken");
const {JWT_USER_SECRET}= require("../config")

function userMiddleware(res,req,next){
    const token = req.headers.token;

    const verification = jwt.verify(token,JWT_USER_SECRET);

    if(verification){
        req.userId=verification.id;
    }
    else{
        res.status(403).json({
            message:"You are not logged in"
        })
        return
    }
    next()
}

module.exports={
    userMiddleware:userMiddleware
}