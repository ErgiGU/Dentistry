const mongoose = require('mongoose');
const timeslotSchema = require('../../helpers/schemas/timeslot')
const dentistSchema = require('../../helpers/schemas/dentist')
const patientSchema = require('../../helpers/schemas/patient')


let config
try {
    config = require('../../helpers/config');
} catch (e) {
    config = require('../../helpers/dummy_config')
}

let timeslotJSON = {
    clinics: []
}



// Variables
const mongoURI = config.module_config.appointmentUser.mongoURI
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

const timeslotModel = mongooseClient.model('Timeslot', timeslotSchema)
const clinicModel = mongooseClient.model('Clinic', patientSchema)
const patientModel = mongooseClient.model('Patient', patientSchema)
const dentistModel = mongooseClient.model('Dentist', dentistSchema)

//save timeslots
function bookedMailingData(clinicID) {

    clinicModel.findById(clinicID, function (err, clinic) {
        const random = [{
            hello: "help"
        }]

        const timeslot = new timeslotModel({
            startTime: "Someone Senja",
            clinic: clinicID // <-- The ID of the clinic goes here
        });

        const patient = new patientModel({
            name: "Mathias Hallander",
            timeslot: timeslot._id
        });

        const dentist = new dentistModel({
            name: "Ergi Senja",
            timeslot: timeslot._id
        });

        dentist.save()
        patient.save()

        timeslot.dentist = dentist
        timeslot.patient = patient

        timeslot.save()
        clinic.timeslots.push(timeslot._id)
        clinic.markModified('timeslots');
        clinic.save()
    })



    timeslotModel.findById(clinicID).populate("timeslots").then( r => {
        console.log(r)
        return r
    });

    return "randomStuff"




    /*
    try {

        timeslots.forEach(timeslot => {

            let openingHourString

            if(clinic.openingHours.monday.start) {
                openingHourString = "Opening Hours: " +
                    "\nMonday: " + clinic.openingHours.monday.start + " - " + clinic.openingHours.monday.end +
                    "\nTuesday: " + clinic.openingHours.tuesday.start + " - " + clinic.openingHours.tuesday.end +
                    "\nWednesday: " + clinic.openingHours.wednesday.start + " - " + clinic.openingHours.wednesday.end +
                    "\nThursday: " + clinic.openingHours.thursday.start + " - " + clinic.openingHours.thursday.end +
                    "\nFriday : " + clinic.openingHours.friday.start + " - " + clinic.openingHours.friday.end
            }else {
                openingHourString = "No opening hours given"
            }
            clinicMapJSON.clinics.push({
                coordinates: [clinic.coordinates.longitude, clinic.coordinates.latitude],
                properties: {
                    title: clinic.name,
                    address: "Address: " + clinic.address,
                    opening_hours: openingHourString

                }
            })
        })
        if (!clinicErrorFlag) {
            return clinicMapJSON
        } else {
            return clinicErrorFlag
        }
    } catch (err) {
        console.log(err)
    }*/
}


const appointmentsController = {
    bookedMailingData
}

module.exports = appointmentsController

// Model creation