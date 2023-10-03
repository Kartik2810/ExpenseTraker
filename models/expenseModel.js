const mongoose = require("mongoose");

const { Schema} = mongoose;

const expenseSchema = new Schema({
    userid:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:[true,"Amount Field is Required"],
    },
    category:{
        type:String,
        
    },
    refrence:{
        type:String,
        required:[true,"refrence Field is Required"],
    },
    description:{
        type:String,
        required:[true,"Description Field is Required"],
    },
    date:{
        type:Date,
        required:[true,"Date Field is Required"],
    },
},{timestamps:true})

const ExpenseModel = mongoose.model("transections",expenseSchema)

module.exports = ExpenseModel;