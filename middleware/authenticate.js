const jwt = require('jsonwebtoken');
const express = require('express');
const usermodel = require('../model/user');
const app = express();
const Authenticate = async(req,res,next)=>{
    try {
        const token=req.cookies.jwtoken;
        const verifyToken=jwt.verify(token,process.env.SECRET_KEY);
        const owner = await usermodel.findOne({_id:verifyToken._id,"tokens.token":token});
        if(!owner){throw new Error("user not found")}
        req.token=token;
        next();
    } catch (error) {
        res.status(401).send("no token found");
    }
}
module.exports = Authenticate;