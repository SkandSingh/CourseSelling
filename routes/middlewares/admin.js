const jwt = require("jsonwebtoken");
const {JWT_Admin_SECRET}= require("../config")

function adminMiddleware(res,req,next){
    const token = req.headers.token;

    const verification = jwt.verify(token,JWT_Admin_SECRET);

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
    adminMiddleware:adminMiddleware
}