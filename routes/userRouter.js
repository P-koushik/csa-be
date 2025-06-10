const express = require("express");

const app = express();

const {Router} = express;

const {adminmodel,coursemodel,purchasedmodel} = require("../db");

const {userAuth} = require("../middleware/adminMiddleware");

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

