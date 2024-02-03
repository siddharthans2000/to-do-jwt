const jwtPassword=process.env.jwtPassword
const {User,Todos}=require("../db/index")
const jwt=require("jsonwebtoken")

async function userMiddleware(req,res,next){
    const auth=req.headers['authorization'];
    const token=auth.split(' ')[1]
    if(!token){
        res.status(401).json({
            message:"Token not available"
        })
    }
    try{
    const decoded=jwt.verify(token,jwtPassword);
    req.user=decoded.username;
    next();
    }
    catch(err){
        res.status(403).json({
            success:false,
            data:"Issue with token"
        })
    }

}

module.exports={userMiddleware}