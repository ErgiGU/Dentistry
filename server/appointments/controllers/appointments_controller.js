const mongoose = require('mongoose');
const timeslotSchema = require('../../helpers/schemas/timeslot')
const dentistSchema = require('../../helpers/schemas/dentist')
const patientSchema = require('../../helpers/schemas/patient')
const clinicSchema = require('../../helpers/schemas/clinic')

let config
try {
    config = require('../../helpers/config-server');
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
    console.log(dentist + " this is the dentist ")

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

    middlemanTimeslotsList = clinic.timeslots
    clinic.timeslots = []
    middlemanTimeslotsList.push(timeslot._id)

    clinic.timeslots = middlemanTimeslotsList

    clinic.save()

    return timeslot
}

async function cancelAppointment(timeslotID){
    try{
        let timeslotReturn = await timeslotModel.findByIdAndDelete(timeslotID).populate("dentist").populate("patient").populate("clinic")
        await patientModel.findByIdAndDelete(timeslotReturn.patient)

        return {result: "Success", timeslot: timeslotReturn}

    }catch (e) {
        console.log(e)
        console.log("The appointment cancellation has failed")
        return  {result: "Failure"}
    }

}
// Generates dummy data into the given clinic ID.
async function generateData(clinicID) {

    let clinic = await clinicModel.findById(clinicID).populate('timeslots')
    console.log(clinic)

    let thingTimeslots = []
    let thingDentists = []
    console.log('found clinic timeslots:')
    console.log(clinic.timeslots)

    const timeslot = new timeslotModel({
        startTime: "Someone Senja",
        clinic: clinicID // <-- The ID of the clinic goes here
    });

    const patient = new patientModel({
        name: "Mathias Hallander",
        timeslot: timeslot._id,
        email: "burakaskan2001@gmail.com"
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

    timeslot.save()

    thingTimeslots = clinic.timeslots
    clinic.timeslots = []
    thingTimeslots.push(timeslot._id)

    console.log('exists: ' + clinic.dentists)
    thingDentists = clinic.dentists
    clinic.dentists = []
    thingDentists.push(dentist._id)


    clinic.city = 'was'
    console.log(thingTimeslots + " ::::: " + thingDentists)
    clinic.timeslots = thingTimeslots
    clinic.dentists = thingDentists
    clinic.save()
}

async function sendAppointmentInformation(intermediary){

    let ClinicTimeslots = {
        timeslots: []
    }
    const timeslots = await timeslotModel.find({clinic: intermediary}).populate("patient").populate("dentist")
    console.log(timeslots)
    try {
        timeslots.forEach(timeslot => {
            ClinicTimeslots.timeslots.push({
                patient: {
                    name : timeslot.patient.name,
                    text : timeslot.patient.text
                },
                dentist: {
                    name: timeslot.dentist.name
                },
                timeslot: timeslot.startTime
            })
        })
    } catch (e) {
    console.log(e)
    }
    return ClinicTimeslots
}
const appointmentsController = {
    bookedMailingData,
    makeAppointment,
    cancelAppointment,
    generateData,
    sendAppointmentInformation
}

module.exports = appointmentsController

// Model creation