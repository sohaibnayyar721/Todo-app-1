const router = require('./router/router')
const mongodbConnection=require('./dbConnection')
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app=express()


app.use(cors())
app.use(express.json())
app.use(router)


mongodbConnection()

app.listen(process.env.PORT,()=>{
    console.log("Server is running")
    }
)