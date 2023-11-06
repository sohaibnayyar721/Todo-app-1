const router = require('./router/router')
const mongodbConnection=require('./dbConnection')
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app=express()
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

app.use(cors(corsOptions))
app.use(express.json())
app.use(router)


mongodbConnection()

app.listen(process.env.PORT,()=>{
    console.log("Server is running")
    }
)