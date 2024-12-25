const UserModel = require("../model/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
dotenv.config()

const signup=async(req,res)=>{
     
     const {name,email,password}=req.body

     if(req.body.role)
     {
        return res.status(400).send({message:"role can not be send from req.body"})

     }

     if(!name || !email || !password)
     {
        return res.status(400).send({message:"please fill in all fields"})
     }

     try {
        
        const IsUserExit= await UserModel.findOne({email})

        if(IsUserExit)
        {
            return res.status(400).send({message:"user already exist"})
        }

        bcrypt.hash(password,5,async(err,hash)=>{

            if(err){
                return res.status(400).send({message:"error in hashing password"})
            }

            await UserModel.create({name,email,password:hash})
            res.status(200).send({message:"User Created successfully"})

        })
        
     } catch (error) {
        res.status(400).send({message:error})
     }
}


const signin=async(req,res)=>{
    const {email,password}=req.body

    if(!email || !password){
        return res.status(400).send({message:"please fill in all fields"})
    }

    const IsUserExit=await UserModel.findOne({email})

    if(!IsUserExit)
    {
        return res.status(400).send({message:"Please Signup"})
    }

    bcrypt.compare(password,IsUserExit.password,function(err,result){
        if(err){
            return res.status(400).send({message:"error in comparing password"})
        }

        if(result){
            const {password,...rest}=IsUserExit._doc

            jwt.sign({ userdata:rest }, process.env.privateKey,  function(err, token) {
                
                if(err){
                    return res.status(400).send({message:"error in generating token"})
                }
                console.log(token)
                res.cookie("verificationToken",token).status(200).send({message:"user login successfully",UserData:rest})
              });

           
        }
        else{
            return res.status(400).send({message:"incorrect password"})
        }
    })
}

module.exports={signup,signin}