const mongoose=require('mongoose')


let Schema = mongoose.Schema;

let userSchema = new Schema({
    username:{
        type:String,
        required:[true,"Please enter a username"],
    },
    email:{
        type:String,
        required:[true,"Please enter a username"],
        unique:[true,"Email already exists"]
    },
    password:{
        type:String,
        required:[true,"Please enter a password"]
    }
},{
    timestamps:true
});
// Compile model from schema
module.exports=mongoose.model("User",userSchema)