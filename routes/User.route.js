const express=require("express")

const app=express.Router()



const UserModel=require("../model/Usermodel")

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');

app.use(express.json())
app.get("/",async(req,res)=>{
    const data=await UserModel.find()
    res.send(data)
})

app.post("/register",async(req,res)=>{
    try{
        const {username,email,password}=req.body
        let user = await UserModel.find({email})
        if(user.length==0){
            bcrypt.hash(password, saltRounds, async(err, hash)=> {
                if(err){
                    res.send({msg:"user is not created"})
                }
                else{
                    const user= new UserModel({username:username,email:email,password:hash})
                    await user.save()
                    res.send({"msg":"signup successful"})
                }
            });
            
        }
        else{
            res.send({"msg":"user already exists"})
        }
    }    
    catch(err){
        res.send({msg:"user is not registered",err:err.msg})
    }
})

app.post("/login",async(req,res)=>{
    const {email,password}=req.body
    let user = await UserModel.find({email})
    if(user.length==0)
    {
        res.send({"msg":"user does not exists"})
    }
    else
    {
        try{
            const user=await UserModel.findOne({email})
            bcrypt.compare(password, user.password, async(err, result)=> {
                if(result){
                 const token = jwt.sign({ userId: user._id }, 'login');
                 res.send({msg:"user login successfully",token:token,name:user.username})
                }
                else{
                 res.send({"msg":"invalid credentials"})
                }
             })
            
        }
        catch(err){
    
        }
    }
    
})

module.exports=app