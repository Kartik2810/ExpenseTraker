const User = require("../models/userModel")


const registerController=async(req,res)=>{
    try {
    const user =  new User(req.body);
    await user.save()
    res.send(user)
    } catch (error) {
            console.log({message:`error in registerController error = ${error}`})
    }
};

const loginController = async(req,res)=>{
    try {
        
    
    const {email,password} = req.body;
    let user = await User.findOne({email,password});
    if(!user){
        res.status(404).send("user not found")
    }
    res.send(user)
    } catch (error) {
            console.log({message:`error in loginController error = ${error}`})
    }
};

module.exports = {registerController,loginController};