const express = require('express');
const routes = express.Router();
const usermodel = require('../model/user');
const { verify } = require('jsonwebtoken');
const accountsid = "AC1d484580f213690db4c49e43fc80ee36";
const authtoken = "64e84263203e1f65d298e78061c833f3";
const client = require('twilio')(accountsid,authtoken);
const jwt = require('jsonwebtoken');
const { sendotp, verifyOtp, updateDeatails, updatepasswaord, profilefind } = require('../mediacontroller/mediacontroller');
const Authenticate = require('../middleware/authenticate');
routes.route('/signup').post(sendotp);
routes.route('/signup/verify').post(verifyOtp);
routes.route('/update').post(updateDeatails);
routes.route('/update/password').post(updatepasswaord);
routes.route('/profile').post(Authenticate,profilefind);
module.exports = routes;