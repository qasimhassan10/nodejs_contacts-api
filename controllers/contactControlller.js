const asyncHandler=require('express-async-handler')
const mongoose=require('mongoose')
const Contact=require('../models/contactsModel')


//GET ALL CONTACTS
const getAllContacts=asyncHandler(async(req,res)=>{
    const contacts=await Contact.find();
    res.status(200).json(contacts)
});


//GET a single contact
const getContact=asyncHandler(async(req,res)=>{
    const id=req.params.id
    const contact=await Contact.findById(id)
    if(!contact)
    {
        res.status(404)
        throw new Error("Contact not found")
    }
    res.status(200).json(contact)
});

//Create Contact
const createContact=asyncHandler(async(req,res)=>{
    const {name, email,phone}=req.body
    if(!name || !email || !phone)
    {
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const createdContact=await Contact.insertMany({
        name:name,
        email:email,
        phone:phone
    })
    res.status(200).json({message:"Contact has been created",createdContact})
});

//Update contact
const updateContact=asyncHandler(async(req,res)=>{ 
    const contact=await Contact.findById(req.params.id)
    if(!contact)
    {
        res.status(404)
        throw new Error("Contact not found")
    } 
    const updatedContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    ) 
    res.status(200).json({"message":`Update Contact for ${req.params.id}`,updatedContact})
});

//delete contact
const deleteContact=asyncHandler(async(req,res)=>{
    const id=req.params.id
    if(!id){
        res.status(404)
        throw new Error("Contact cannot be deleted because it does not exist")
    }
    const deleteContact=await Contact.findByIdAndDelete(id)
    res.status(200).json({message:`${deleteContact} has been deleted`})

});

module.exports={
    getAllContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
}