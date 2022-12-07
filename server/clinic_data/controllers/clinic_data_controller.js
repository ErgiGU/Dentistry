
const mongoose = require('mongoose');
const config = require('../../helpers/config');
const clinicSchema = require('../../helpers/schemas/clinic');

const clinics = {
    "_id": {
        "$oid": "638e488517a8fd8e8c9bf872"
    },
    "name": "Your Dentist",
    "password": "hey12345",
    "email": "dantist@hotmail.se",
    "owner": "Dan Tist",
    "dentists": [],
    "timeslots": [],
    "address": "Spannmålsgatan 20",
    "city": "Gothenburg",
    "coordinate": {
        "longitude": 11.969388,
        "latitude": 57.707619
    },
    "openingHours": {
        "monday": {
            "start": "09:00",
            "end": "17:00"
        },
        "tuesday": {
            "start": "08:00",
            "end": "17:00"
        },
        "wednesday": {
            "start": "07:00",
            "end": "16:00"
        },
        "thursday": {
            "start": "09:00",
            "end": "17:00"
        },
        "friday": {
            "start": "09:00",
            "end": "15:00"
        }
    }
}

// Variables
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://' + config.clinicUser.name + ':' + config.clinicUser.password + '@cluster0.lj881zv.mongodb.net/?retryWrites=true&w=majority';
//const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ClinicDB';

// Connect to MongoDB
const mongooseClient = mongoose.createConnection(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true}, function (err) {
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
})

async function editInfo (req, res){
    const clinicModel = mongooseClient.model('clinic', clinicSchema);
    const {email} = req.body.email
    const clinic = await clinicModel.findOne({email: "dantist@hotmail.se"})
    console.log(clinic.name + "gh")
    console.log(clinic.openingHours.tuesday)
    if (clinic) {
        clinic.name = req.body.name || clinic.name;
        clinic.owner = req.body.owner || clinic.owner;
        clinic.address = req.body.address || clinic.address;
        clinic.email = req.body.email || clinic.email;
        clinic.openingHours.monday = req.body.openingHours.monday || clinic.openingHours.monday;
        clinic.openingHours.tuesday = req.body.openingHours.tuesday || clinic.openingHours.tuesday;
        clinic.openingHours.wednesday = req.body.openingHours.wednesday || clinic.openingHours.wednesday;
        clinic.openingHours.thursday = req.body.openingHours.thursday || clinic.openingHours.thursday;
        clinic.openingHours.friday = req.body.openingHours.friday || clinic.openingHours.friday;
        res.status(200).json("sucessfully updated");
    } else {
        res.status(404).json("Clinic not found");
    }
}
module.exports = {editInfo};