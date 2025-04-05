const {Router} =  require("express");
const {userMiddleware}=require("./middlewares/user");
const {PurchaseModel, CourseModel}=require("../db")

const courseRouter = Router();



courseRouter.post("/purchase",userMiddleware,async function(req,res){
    const userId = req.userId;
    const courseId = req.body.courseId;

    try {
        await PurchaseModel.insertOne({
            userId,
            courseId
        })
    
        res.json({
            message: "You have successfully bought the course"
        })
    } catch (error) {
        res.status(403).json({
            message:"Could not insert data in database"
        })
    }
   
})

courseRouter.get("/review",async function(req,res){
    try {
        const courses = await CourseModel.find({});
        res.json({
            courses});
    } catch (error) {
        res.status(403).json({
            message:"Could not fetch the courses"
        })
    }
})


module.exports = {
    courseRouter:courseRouter
}