const jwt = require("jsonwebtoken");

const {USER_JWT_SECRET} = require("../config");


function userAuth(req,res,next){
    const token = req.headers.token;

    const  decoded = jwt.verify(token,USER_JWT_SECRET);
    
    if(decoded){
        req.uesrId = decoded.id;
        next() 
    }else{
        res.status(403).json({
            message:"You are not signed in"
        })
    }

} 
export {userAuth}