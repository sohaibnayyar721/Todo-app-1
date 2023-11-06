const mongoose = require('mongoose')
require('dotenv').config()
const mongodbConnection = async ()=>{
    try{
        
     await mongoose.connect(process.env.DB_Connection)
       console.log("MongoDb connected")

    }
    catch(err){
        console.log(err)
    }
}

module.exports=mongodbConnection

