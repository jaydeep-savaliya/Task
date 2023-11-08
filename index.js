const express = require('express')
const app = express();
const usermodel = require('./model/user');
app.use(express.urlencoded({extended:false}));
app.use(express.json());
const cors = require('cors');
app.use(cors);
const routes = require('./routes/auth');
app.use("/api/test",routes);
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/otpvarification',{
    maxIdleTimeMS:500,
    authMechanism:'DEFAULT',
    autoCreate:true,
    autoIndex: false,
    maxPoolSize: 10,
    socketTimeoutMS: 45000,
    family:4
});

app.listen(8000,()=>{
    console.log("port running");
})