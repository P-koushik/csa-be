const mongoose = require("mongoose")

const schema = mongoose.Schema

const ObjectId = schema.Types.ObjectId

const userSchema = new schema({
    firstname:String,
    lastname:String,
    email:{typr:String,unique:true},
    password:String
})

const adminSchema = new Schema({
    firstname:String,
    lastname:String,
    email:{typr:String,unique:true},
    password:String
})

const courseSchema = new Schema({
    titie:String,
    descreption:String,
    price:String,
    imageUrl:String,
    createrId:ObjectId
})

const purchasedSchema = new Schema({
    userId: ObjectId,
    courseId: ObjectId
})

const usermodel = mongoose.model("user",userSchema)
const adminmodel = mongoose.model("admin",adminSchema)
const coursemodel = mongoose.model("course",courseSchema)
const purchasemodel = mongoose.model("purchase",purchasedSchema)


export {usermodel,adminmodel,coursemodel,purchasemodel};