//const express = require("express");
//const router = express.Router();
const bcrypt = require("bcrypt");
//import {clinicModel} from '../authorization_app';


// Register new clinic
const registerClinic = async (req, res) => {
    const {name, email, password} = req.body

    //checking for missing attributes
    if(!name || !email || !password){
        res.status(400)
        throw new Error("information missing");
    }

    const clinic = await clinicModel.find({email})

    // finding pre-existing user
    if(clinic){
        res.status(400)
        throw new Error("clinic already registered")
    }

    //hash password WHAT
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    //create clinic
    const newClinic = await clinicModel.create({
        name: name,
        email: email,
        password: hashedPassword
    })

    if(newClinic){
        res.status(201).json({
            name: newClinic.name,
            email: newClinic.email,
            message: "clinic registered"
        }
    )
    } else {
        res.status(400)
        throw new Error("Invalid data")
    }
}

// Authenticate a clinic
const loginClinic = async (req, res) => {
    const {email, password} = req.body

    // should find if clinic is registered
    const clinic = await clinicModel.find({email})

    if (clinic && bcrypt.compare(password, clinic.password)){
        res.json({
            name: clinic.name,
            email: clinic.email,
            password: clinic.password
        })
    } else{
        res.status(400)
    throw new Error("incorrect credentials")
}
    res.json({message:'authenticate clinic'})
}

module.exports = {
   registerClinic,
   loginClinic
}
