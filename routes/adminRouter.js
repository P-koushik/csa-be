const express = require("express");

const app = express();

const {Router} = express;

const {adminmodel,coursemodel,purchasedmodel} = require("../db");

const {adminAuth} = require("../middleware/adminMiddleware");

const adminRouter = Router();

const jwt = require("jsonwebtoken");

const {ADMIN_JWT__SECRET} = require("../config");

app.use(express.json());

adminRouter.post("/signup",async function(req,res){
    const {firstname,lastname,email,password} = req.body;

    try{
        await adminmodel.create({
            firstname,
            lastname,
            email,
            password
        })

        res.send("User signed up");
    }catch{
        res.json({
            message: "credentials already present please login"
        })
    }
})

adminRouter.post("/signin",async function(req,res){
    const {email,password} = req.body;

    const admin = await adminmodel.findOne({
        email,password
    })
    
    if(admin){
        const token = jwt.sign({
            id:admin._id.toString()
        },ADMIN_JWT__SECRET)
    }

    res.json({
        message: "admin logged in",
        token
    })
})

adminRouter.use(adminAuth)

adminRouter.post("/courses",async function(req,res){
    const adminId = req.adminId;
    const {title,description,price,imageUrl,creatorId} = req.body;

    const course = await coursemodel.create({
        title,
        description,
        price,
        imageUrl,
        creatorId
    })
    res.json({
        message:"course created",
        courseId:adminId
    })
})

adminRouter.put("/course",async function(req,res){
    const adminId = req.adminId;
    const {title,description,price,imageUrl,courseId} = req.body;

    const course =  await courseModel.updateOne({
    _id:courseId,
    creatorId:adminId
   },{
        title,
        description,
        price,
        imageUrl,
    })

    res.json({
        message:"Course Updated",
        courseId: course._id
    })
})

adminRouter.get("/course/bulk",async function(req,res){
    const adminid = req.adminId

    const course = await coursemodel.find({
        course_id:adminid
    });

    res.json({
        message:"All courses",
        course
    })
})

export { adminRouter };
