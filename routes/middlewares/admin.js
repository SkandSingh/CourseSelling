const jwt = require("jsonwebtoken");
const {JWT_Admin_SECRET}= require("../config")

function adminMiddleware(req,res,next){
    const token = req.headers["token"];

    const verification = jwt.verify(token,JWT_Admin_SECRET);

    if(verification){
        req.userId=verification.id;
        next();
    }
    else{
        res.json({
            message:"You are not logged in"
        })
        return
    }
}
 
module.exports={
    adminMiddleware:adminMiddleware
}