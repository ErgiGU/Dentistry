const mongoose = require('mongoose');
const timeslotSchema = require('../../helpers/schemas/timeslot')
const dentistSchema = require('../../helpers/schemas/dentist')
const patientSchema = require('../../helpers/schemas/patient')
const clinicSchema = require('../../helpers/schemas/clinic')

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
const clinicModel = mongooseClient.model('Clinic', clinicSchema)
const patientModel = mongooseClient.model('Patient', patientSchema)
const dentistModel = mongooseClient.model('Dentist', dentistSchema)

//save timeslots
async function bookedMailingData(clinicID, timeslotID) {
    let clinic = await clinicModel.findById(clinicID)
    let timeslot = await timeslotModel.findById(timeslotID).populate('dentist').populate('patient')
    let dentist = timeslot.dentist
    let patient = timeslot.patient


    return {
        clinicData: {
            name: clinic.name,
            address: clinic.address,
            email: clinic.email
        },
        timeslotTime: timeslot.startTime,
        dentistData: {
            name: dentist.name,
            email: dentist.email
        },
        patientData: {
            name: patient.name,
            email: patient.email,
            text: patient.text
        }
    }
}

async function makeAppointment(clinicID, dentistID, patientInfo, timeslotTime) {
    let clinic = await clinicModel.findById(clinicID)
    let dentist = await dentistModel.findById(dentistID)

    let middlemanTimeslotsList = []

    const timeslot = new timeslotModel({
        startTime: timeslotTime,// <-- The start-time of the selected timeslot goes here
        clinic: clinicID
    });

    const patient = new patientModel({
        name: patientInfo.name,
        email: patientInfo.email,
        dateOfBirth: patientInfo.dateOfBirth,
        text: patientInfo.text,
        timeslot: timeslot._id
    });

    patient.save()

    timeslot.dentist = dentist
    timeslot.patient = patient

    timeslot.save()

    if (clinic.timeslots === []) {
        clinic.timeslots = []
    } else {
        middlemanTimeslotsList = clinic.timeslots
        middlemanTimeslotsList.push(timeslot._id)
    }

    clinic.timeslots = middlemanTimeslotsList

    clinic.save()

    return timeslot
}

//save timeslots
async function generateData(clinicID) {

    let clinic = await clinicModel.findById(clinicID).populate('timeslots')
    console.log(clinic)

    let thingTimeslots = []
    let thingDentists = []
    console.log('found clinic timeslots:')
    console.log(clinic.timeslots)

    /*const timeslot = new timeslotModel({
        startTime: "Someone Senja",
        clinic: clinicID // <-- The ID of the clinic goes here
    });

    const patient = new patientModel({
        name: "Mathias Hallander",
        timeslot: timeslot._id
    });

    const dentist = new dentistModel({
        name: "Ergi Senja",
        timeslot: timeslot._id,
        clinic: clinicID
    });

    dentist.save()
    patient.save()

    timeslot.dentist = dentist
    timeslot.patient = patient

    timeslot.save()*/

    console.log(clinic.timeslots + " :::: " + clinic.dentists + ":   These are the clinic stuff 1")

    if (clinic.timeslots === []) {
        console.log('created timeslots new array')
        clinic.timeslots = []
    } else {
        console.log('exists: ' + clinic.timeslots)
        thingTimeslots = clinic.timeslots
        thingTimeslots.push()
    }

    if (clinic.dentists === []) {
        console.log('created dentists new array')
        clinic.dentists = []
    } else {
        console.log('exists: ' + clinic.dentists)
        thingDentists = clinic.dentists
        console.log()
        thingDentists.push()
    }

    clinic.city = 'mathiashow'
    console.log(clinic.timeslots + " :::: " + clinic.dentists + ":   These are the clinic stuff 2")
    console.log(thingTimeslots + " ::::: " + thingDentists)
    clinic.timeslots = thingTimeslots
    clinic.dentists = thingDentists
    clinic.save()
}


const appointmentsController = {
    bookedMailingData,
    makeAppointment,
    generateData
}

module.exports = appointmentsController

// Model creation