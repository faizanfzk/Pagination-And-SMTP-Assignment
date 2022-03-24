const path=require("path")
const express=require("express");
const  transporter = require("../configs/mail");
const User=require("../models/user.model")
const Admin=require("../models/admin.model")
const router=express.Router();

router.get("/",async(req,res)=>{
  try {
    const page=req.query.page||1;
    const pagesize=req.query.pagesize||5;

    const skip=(page-1)*pagesize
    
    const users=await User.find().skip(skip).limit(pagesize).lean().exec();

    const totalpage=Math.ceil((await User.find().countDocuments())/pagesize);

    const admin = await Admin.find().lean().exec()

   return res.status(200).send({users,totalpage})

  } catch (error) {
    return res.status(500).send(error.message)
  }
})


router.post("/",async(req,res)=>{
    try {
        const user=await User.create(req.body)
        transporter.sendMail({
            from: '"Main Admin "<admin@amazon.com', // sender address
            to: user.email, 
            subject: `Welcome to ABC system ${user.first_name}${user.last_name}`, // Subject line
            text: `Hi ${user.first_name}, Please confirm your email address`, // plain text body
           
          });
          transporter.sendMail({
            from: '"Main Admin " <admin@amazon.com>', // sender address
            to: "admin1@admin.com,admin2@admin.com,admin3@admin.com,admin4@admin.com,admin5@admin.com", 
            subject: ` ${user.first_name}${user.last_name} has registered`, // Subject line
            text: `Please welcome ${user.first_name}`, //
            
           
          });  

         return  res.status(200).send({message:"user added"})

    } catch (error) {
       return res.status(500).send(error.message) 
    }
})






module.exports=router;


