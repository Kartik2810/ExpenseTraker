const express =  require("express");
const { registerController, loginController } = require("../controllers/userController");

//router object
const router = express.Router();

//register router 
router.post("/register",registerController);

//login router
router.post("/login",loginController);

module.exports = router
