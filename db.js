const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

mongoose.connect("mongodb+srv://skand:alaksdfjewsjn@cluster0.32bit7y.mongodb.net/courseSelling-app");


const User = new Schema({
    email:{type:String,unique:true},
    password:String,
    firstName:String,
    lastName:String
})

const Admin = new Schema({
    email:String,
    password:String,
    firstName:String,
    lastName:String
})

const Course = new Schema({
    title:String,
    description:String,
    price:Number,
    imageUrl:String,
    creatorId:ObjectId
})

const Purchase = new Schema({
    courseId:ObjectId,
    userId:ObjectId
})

const UserModel = mongoose.model("users",User);
const AdminModel = mongoose.model("admin",Admin);
const CourseModel = mongoose.model("courses",Course);
const PurchaseModel = mongoose.model("purchase",Purchase);

module.exports = {
    UserModel:UserModel,
    AdminModel:AdminModel,
    CourseModel:CourseModel,
    PurchaseModel:PurchaseModel
}