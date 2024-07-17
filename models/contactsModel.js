const mongoose=require('mongoose')
const Schema =mongoose.Schema

const contactSchema=new Schema({
    name:{
        type:String,
        required:[true,"Please add a contact name"]
    },
    email:{
        type:String,
        required:[true,"Please add an email address"]
    },
    phone:{
        type:String,
        required:[true,"Please add a phone number"]
    }
},
{
    timestamps:true
})

module.exports = mongoose.model('Contact',contactSchema);