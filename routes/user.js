const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../db");
const { z } = require("zod");

const userRouter = Router();
const JWT_SECRET = "Skand123";

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
        }, JWT_SECRET);
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

userRouter.get("/purchases", function (req, res) {

})

module.exports = {
    userRouter: userRouter
}