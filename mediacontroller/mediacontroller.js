const usermodel = require("../model/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let OTP,user;
const sendotp = async(req,res)=>{
    try {
        const {name,phone,email,password} = req.body;
        const data = await usermodel.findOne({phone});
        if(data){
            return res.status(400).json({message:"uesr alresdy exist"});
        }
        user = new usermodel({
            name,
            phone,
            email,
            password
        });
        let digits = "0123456789";
        OTP = ""
        for(let i=0;i<4;i++){
            otp+=digits[Math.floor(Math.random()*10)];
        }
        await client.messages.create({
            body:`otp send to phone ${phone}`,
            messagingServiceSid:"MG9752274e9e519418a7406176694466fa",
            to:`+91${phone}`
        }).then(()=>res.status(200).json({msg:"message Sent"})).done();
    } catch (error) {
        return res.json(error);
    }
}
const verifyOtp = async(req,res)=>{
    try {
        const {otp} = req.body;
        if(otp!=OTP){
            return res.json({msg:"Otp is not correct"});
        }
        const token = await jwt.sign(user,"mykey");
        user[tokens] = token;
        await user.save();
        return res.json(token);
        OTP = "";
    } catch (error) {
        return res.json({msg:"Error occure"});
    }
}
const updateDeatails = async(req,res)=>{
    const {email} = req.body;
    try {
        const data = await usermodel.findOne({email});
        
        if(Object.length(data)<1){
            return res.json({msg:"please Login Before update"});
        }
        else {
            user = data;
            return res.json({msg:"now you able to update the details"});
        }
    } catch (error) {
        
    }
}
const updatepasswaord = async(req,res)=>{
    const {newpassword} = req.body;
    try {
        const data = await usermodel.updateOne(
            {email:user.email},
            {$set:{password:newpassword}});
        return res.json({msg:"password change successfully"});
    } catch (error) {
        return res.json(error);
    }
}

const Login = async(req,res)=>{
    const {user,password}=req.body;
    try {
        const user_data = await usermodel.findOne({user});
        if(!Object.length(user_data)<1){
            const isMatch = bcrypt.compare(user_data.password,password);
            if(isMatch){
                const token = user_data.tokens.token;
                res.cookie("jwtoken",token,{
                    expires:new Date(Date.now()+3600000),
                    httpOnly:true
                });
                return res.json({msg:"welcome"});
            }
        }else{
            return res.json({msg:"no user found"});
        }
        return res.json({msg:"no user found"});
    } catch (error) {
        return res.json(error);
    }
}
const profilefind = async(req,res)=>{
    try {
        const token = req.token;
        const real = await jwt.verify(token,"mykey",(error,token)=>{
            if(error){
                return res.json({msg:"no user found"});
            }
            else{
                res.json(token);
            }
        })
        
    } catch (error) {
        return res.json(error);
    }
}
module.exports = {
    sendotp,
    verifyOtp,
    updateDeatails,
    updatepasswaord,
    profilefind
}