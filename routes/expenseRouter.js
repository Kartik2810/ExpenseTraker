const express = require("express");
const { addExpense, getExpense, editExpense,deleteExpense } = require("../controllers/expenseController");
const router = express.Router();

router.post("/add-Expense",addExpense);

router.post("/get-Expense",getExpense);

router.post("/edit-Expense",editExpense);

router.post("/delete-Expense",deleteExpense);


module.exports =router;
