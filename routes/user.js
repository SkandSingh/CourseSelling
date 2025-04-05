const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { CourseModel,UserModel,PurchaseModel } = require("../db");
const { z } = require("zod");
const {userMiddleware}=require("./middlewares/user")

const userRouter = Router();
const {JWT_USER_SECRET}= require("./config")
userRouter.post("/signup", async function (req, res) {

    const { email, password, firstName, lastName } = req.body;

    const user = z.object({
        email: z.string().min(3).max(50).email(),
        password: z.string().min(3).max(50),
        firstName: z.string().min(3).max(50),
        lastName: z.string().min(3).max(50)
    })

    const success = user.safeParse(req.body);

    if (!success.success) {
        res.status(403).json({
            message: "Invalid credentials",
            error: success.error
        })
        return
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 5);
        await UserModel.insertOne({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })

    } catch (error) {
        res.status(403).json({
            message: "Server Error"
        })
        return
    }

    res.json({
        message: "signup completed"
    })

})


userRouter.post("/login", async function (req, res) {
    const { email, password } = req.body;

    const user = await UserModel.findOne({
        email: email
    })

    if (!user) {
        res.status(403).json({
            message: "User does not exist in databse"
        })
        return
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
        const token = jwt.sign({
            id: user._id.toString()
        }, JWT_USER_SECRET);
        res.json({
            token: token
        })
    }
    else {
        res.status(403).json({
            message: "Incorrect Password"
        })
        return
    }

})

userRouter.use(userMiddleware);

userRouter.get("/purchases", async function (req, res) {

    const userId = req.userId;

    const purchases = await PurchaseModel.find({
        userId,
    });

    let purchasedCourseIds = [];

    for (let i = 0; i<purchases.length;i++){ 
        purchasedCourseIds.push(purchases[i].courseId)
    }

    const coursesData = await CourseModel.find({
        _id: { $in: purchasedCourseIds }
    })

    res.json({
        purchases,
        coursesData
    })

})

module.exports = {
    userRouter: userRouter
}