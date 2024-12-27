const express=require("express")
const { signup, signin } = require("../controller/user.controller")

const UserRouter=express.Router()

UserRouter.post("/signup",signup)
UserRouter.post("/signin",signin)

module.exports=UserRouter