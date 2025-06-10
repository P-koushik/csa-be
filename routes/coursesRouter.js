    const experss = require("express");
    
    const {Router} = experss;

    const courseRouter = Router();

    const {userAuth} = require("../middleware/userMw");

    const {coursemodel,purchasemodel} = require("../db");

    courseRouter.post("/purchase",userAuth,async function(req,res){
        const userId = req.userId;
        const courseId = req.body.courseId;

            // check if user has paid already for a course or not
        await purchasemodel.create({
            userId,
            courseId
        })

        res.json({
            message:"You have successfully bought the course"
        })
    })
    
    courseRouter.get("/preview",async function(req,res){
        const courses = await coursemodel.find({});

        res.json({
            courses
        })
    })


module.exports={
    courseRouter : courseRouter
}