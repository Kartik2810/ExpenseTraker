const mongoose =require("mongoose");
const dotenv = require("dotenv")
dotenv.config()

const mongodbconnection=async()=>{
    
        await mongoose.connect(process.env.mongouri)
    .then(()=>{
    console.log("database connection successfully")
    })
    .catch((error)=>{
        console.log(error)
    })
    
}
module.exports = mongodbconnection;