const express=require('express')
const app = express()
const dotenv=require('dotenv').config()
const contactRoutes=require('./routes/contactRoutes')
const userRoutes=require('./routes/userRoutes')
const errorHandler = require('./middleware/errorHandler')
const connectDb=require('./config/dbConnection')


app.use(express.json())
app.use(errorHandler)
connectDb()

port = process.env.PORT||5000
app.use('/api/contacts',contactRoutes)
app.use('/api/users',userRoutes)


app.listen(port,(req,res)=>{
    console.log(`listeninig to port ${port}`)
})