const ExpenseModel = require("../models/expenseModel")
const moment = require("moment")
const addExpense =async(req,res)=>{
    try {
        
        const Transection =  new ExpenseModel(req.body)
        await Transection.save()
        res.send(Transection)
    } catch (error) {
        console.log({message:`error in expenseController error =${error}`})
    }
}

const editExpense = async(req,res) =>{
    try {
        await ExpenseModel.findOneAndUpdate({_id:req.body.transectionId}, req.body.payload)
    res.status(200).json("edit successfull")
    } catch (error) {
        console.log({message:`error in expenseController, editExpense error =${error}`})
    }
}

const deleteExpense =async(req,res)=>{
    try {
        await ExpenseModel.findByIdAndDelete({_id:req.body.transectionId})
        res.status(200).json(" Delete successfull")
    } catch (error) {
        console.log({message:`error in expenseController,deleteExpense error =${error}`})
    }
}

const getExpense=async(req,res)=>{
    try {
        const {frequency , date ,category} = req.body;
        const transections = await ExpenseModel.find({
            userid: req.body.userid,
        ...(frequency !== "coustom" ? {
            date:{
                $gt: moment().subtract(Number(frequency),"d").toDate()
            }
        } : {
            date:{
                $gte: date[0],
                $lte: date[1],
            },
            
        }),
        ...(category !== "all" && {category})
        })
        
        res.status(200).json(transections)
    } catch (error) {
        console.log({message:`error in expenseController,getExpense error =${error}`})
    }

}

module.exports = {addExpense,getExpense,editExpense,deleteExpense}