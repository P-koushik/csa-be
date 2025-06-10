const jwt = require("jsonwebtoken");

const {ADMIN_JWT_SECRET} = require("../config");


function adminAuth(req,res,next){
    const token = req.headers.token;

    const  decoded = jwt.verify(token,ADMIN_JWT_SECRET);
    
    if(decoded){
        req.adminId = decoded.id;
        next() 
    }else{
        res.status(403).json({
            message:"You are not signed in"
        })
    }

}
export {adminAuth}