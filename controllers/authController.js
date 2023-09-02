const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const userModel = require("../models/userModel");

const registerController=async(req,res)=>
{
    try {
        const userr=await userModel.findOne({email: req.body.email});
        if(userr)
        {
            res.status(200).send({
                success: false,
                message: "User already exists",
                userr
            })
        }
     const salt=await bcrypt.genSalt(10);
     const hashedPassword=await bcrypt.hash(req.body.password,salt);
     req.body.password=hashedPassword;

     const userrr=new userModel(req.body);
     await userrr.save();
     return res.status(201).send({
        success:true,
        message: "User registered successfully"
     })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error
        })
    }
}


const loginController=async(req,res)=>{
    try{
       const existingg=await userModel.findOne({email: req.body.email})
       if(!existingg){
       return res.status(404).send({
           success: false,
           message: "User Not Found"
       })}

       if(existingg.role!==req.body.role)
       {
           return res.status(500).send({
                 success: false,
                 message: "Role does not match"
           })
       }
     const comp=await bcrypt.compare(req.body.password,existingg.password);
     if(!comp)
     {
        return res.status(500).send({
            success: false,
            message: "Wrong Credentials"
        })
     }
     const token=jwt.sign({userId: existingg._id},process.env.JWT_SECRET,{expiresIn: '1d'});
     return res.status(200).send({
        success: true,
        message: "Logged In Sucessfully",
        token,
        existingg
     })
    }catch(error)
    {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login api",
            error
        })
    }
}

const currentUserController=async(req,res)=>{
      try {
        const user=await userModel.findOne({_id:req.body.userId})
        return res.status(200).send({
            success: true,
            message: "user fetched succesfully",
            user
        })
      } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message: "Unable to get current user",
            user
        })
      }
}

module.exports={registerController,loginController,currentUserController};