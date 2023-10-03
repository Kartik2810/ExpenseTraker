const express = require("express");
const morgan = require("morgan");
const cors = require("cors")
const dotenv = require("dotenv")
const path = require("path")
dotenv.config()

//rest object
const app =  express();

//port
const PORT =process.env.PORT || 8080

//database connection
const mongodbconnection = require("./config/db");
mongodbconnection()

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


//route
app.use("/api/auth",require("./routes/userRouter"))
app.use("/api/auth/transection",require("./routes/expenseRouter"))

//read static files
app.use(express.static(path.join(__dirname, './build')))

app.get("*", function(_,res){
res.sendFile(path.join(__dirname, "./build/index.html"),function(err){
    res.status(500).send(err);
})
})

//listen to the server
app.listen(PORT,()=>{
    console.log(" server on")
})

