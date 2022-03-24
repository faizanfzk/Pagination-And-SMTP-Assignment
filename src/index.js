const express=require("express");
const path=require("path")

const transporter=require("./configs/mail")
const userController=require("./controller/user.controller")
const adminController=require("./controller/admin.controller")
const app=express()

app.use("/users",userController)
app.use("/admins",adminController)



module.exports=app;