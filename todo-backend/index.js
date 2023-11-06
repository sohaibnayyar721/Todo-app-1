const router = require('./router/router')
const mongodbConnection=require('./dbConnection')
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app=express()
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://to-do-app-henna-sigma.vercel.app/"); // Update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(cors())
app.use(express.json())
app.use(router)


mongodbConnection()

app.listen(process.env.PORT,()=>{
    console.log("Server is running")
    }
)