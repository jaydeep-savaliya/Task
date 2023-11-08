const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
});
userSchema.pre('save',async function(next){
    try {
        if(this.isModified('password')){
            this.password = await bcrypt.hash(this.password,9);
        }
        next();
    } catch (error) {
        console.log(error);
    }
});
const usermodel = new mongoose.model("usermodel",userSchema);
module.exports = usermodel;