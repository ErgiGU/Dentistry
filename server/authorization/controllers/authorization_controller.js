//const express = require("express");
//const router = express.Router();
const bcrypt = require("bcrypt");
const clinicSchema = require('../../helpers/schemas/clinic');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
let config
try {
    config = require('../../helpers/config');
} catch (e) {
    config = require('../../helpers/dummy_config')
}

// Variables
const mongoURI = config.module_config.authorizationUser.mongoURI;
//const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/UserDB';


// Connect to MongoDB
const mongooseClient = mongoose.createConnection(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true}, function (err) {
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
})

//Model creation
const clinicModel = mongooseClient.model('clinic', clinicSchema);


//Checks to see if the email exists in the DB
 async function emailExists(email) {
     const clinic = await clinicModel.findOne({email:email});
        if(clinic){
            return "email already exists"
        }
 }
 //Register new clinic
 async function register(req){
     //hashes and salts the password that it receives
     const hashedPassword = await bcrypt.hash(req.body.password, 10);
     const clinicAccount = new clinicModel(
        {
            name:req.body.clinicName ,
            address: req.body.address,
            email: req.body.email,
            password: hashedPassword,
            city: "Göteborg"
        });
     try {
         await clinicAccount.save();
         return "success!"
     } catch (error) {
         console.error(error);
         return error;
     }
 }

// Login function
async function loginClinic(email,password) {
    const clinic = await clinicModel.findOne({email: email});
    if (clinic && await bcrypt.compare(password, clinic.password)) {
        const token = clinic.generateToken();
        const payload = {
            message: "login successful",
            clinicAccount: clinic,
            token: token
        }

        return payload;
    }else{
        console.log("failed");
        return "Invalid email/password"
    }
}




module.exports = {emailExists,register,loginClinic};


