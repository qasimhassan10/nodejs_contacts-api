const asyncHandler=require('express-async-handler')
const jwt=require('jsonwebtoken')

const validatToken=asyncHandler(async(req,res,next)=>{
    let token;
    let authHeader =req.header.authorization||req.header.authorization
    if(authHeader && authHeader.startsWith("Bearer")){
        token=authHeader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err)
            {
                res.status(401)
                throw new Error("User is not authorized")
            }
            console.log(decoded)
        })
    }
})
module.exports=validatToken