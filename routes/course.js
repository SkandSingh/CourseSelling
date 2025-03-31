const {Router} =  require("express");

const courseRouter = Router();

courseRouter.post("/purchase",function(req,res){
    res.json({
        message:"Course purchased"
    })
})


courseRouter.get("/review",function(req,res){

})


module.exports = {
    courseRouter:courseRouter
}