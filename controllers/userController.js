const asyncHandler=require('express-async-handler')
const User=require('../models/userModel')
const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


///Register User
const registerUser=asyncHandler(async(req,res)=>{
    const {username,email,password}=req.body
    if(!username||!email || !password)
    {
        res.status(400);
        throw new Error('All fields are mandatory')
    }
    const isUserAvailable=await User.findOne({email})
    if(isUserAvailable){
        res.status(400)
        throw new Error('This email is already registered')
    }
    const hashedPassword=await bcrypt.hash(password,10)
    console.log(hashedPassword)
    const user = await User.create({
        username,
        email,
        password:hashedPassword
    })
    if(user){
        res.status(201).json({_id:user.id,email:user.email})
    }else{
        res.status(400)
        throw new Error('User data is invalid')
    }
});



//login user
const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        res.status(400)
        throw new Error('All fields are mandatory')
    }
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken=jwt.sign(
        {
            user:{
                username:user.username,
                email:user.email,
                id:user.id
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"1m"}
        )
        res.status(200).json({accessToken})
    }else{
        res.status(401)
        throw new Error("Email or password is invalid")
    }
});

//view user
const currentUser=asyncHandler(async(req,res)=>{
    res.status(200).json({message:"Current User"})
});
module.exports={
    registerUser,
    loginUser,
    currentUser
}