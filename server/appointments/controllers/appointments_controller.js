/**
 * All the mongoose manipulation for appointments component is contained here
 * @author Burak Askan (@askan)
 */
const mongooseHandler = require('../../helpers/mongoose_handler')
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

// Connect to MongoDB
let mongooseClient = new mongooseHandler(config.module_config.appointmentUser.mongoURI)
mongooseClient.connect().then(() => {
    createModels()
}, null)

let timeslotModel;
let clinicModel;
let patientModel;
let dentistModel;

function reconnect(mongoURI) {
    mongooseClient.close()
    mongooseClient = new mongooseHandler(mongoURI)
    mongooseClient.connect().then(() => {
        createModels()
    }, null)
}

function createModels() {
    timeslotModel = mongooseClient.model('Timeslot', timeslotSchema)
    clinicModel = mongooseClient.model('Clinic', clinicSchema)
    patientModel = mongooseClient.model('Patient', patientSchema)
    dentistModel = mongooseClient.model('Dentist', dentistSchema)
}

/**
 * The mongoose manipulations to get data required for emailing about the booked timeslot
 * @param clinicId the id of clinic which the timeslot belongs to
 * @param timeslotID the id of the timeslot just booked
 * @returns {Promise<{patientData: {name: string, text: string, email}, dentistData: {name: string, email}, timeslotTime, clinicData: {address, name, email}}>} JSON required for the emails
 */
async function bookedMailingData(clinicId, timeslotID) {
    let clinic = await clinicModel.findById(clinicId)
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

/**
 * The method required for making an appointment
 * @param clinicId the id of the clinic that is getting a timeslot booked
 * @param dentistID the id of the dentist that is getting a timeslot booked
 * @param patientInfo the info of the patient that booked the timeslot
 * @param date
 * @param time
 * @returns {Promise<*>} the timeslot JSON
 */
async function makeAppointment(clinicId, dentistID, patientInfo, date, time) {
    let clinic = await clinicModel.findById(clinicId).populate('dentists')
    let dentist = await dentistModel.findById(dentistID).populate('clinic')
    let patient = await patientModel.findOne({email: patientInfo.email}).populate('timeslots')

    if (patient === null) {
        console.log('creating new patient')
        patient = new patientModel({
            name: patientInfo.name,
            email: patientInfo.email,
            dateOfBirth: patientInfo.dateOfBirth,
            text: patientInfo.text
        });
    }

    if (dentist === null) {

    }

    console.log('creating new timeslot')
    const timeslot = new timeslotModel({
        startTime: time,// <-- The start-time of the selected timeslot goes here
        clinic: clinicId,
        patient: patient._id,
        dentist: dentist._id
    });

    patient.timeslots.push(timeslot._id)
    console.log(patient.timeslots)
    console.log('saving patient')
    patient.save()

    console.log('saving timeslot')
    timeslot.save()

    let mappedDate = clinic.mapStorage.get(date)
    console.log(mappedDate)

    try {
        if (mappedDate !== null && mappedDate.timeslots !== null && mappedDate.timeslots.length > 0) {
            console.log('not new array, adding')
            mappedDate.timeslots.push({_id: timeslot._id})
        }
    } catch (e) {
        console.log('new array needed')
        mappedDate = {
            timeslots: [timeslot._id]
        }
        clinic.mapStorage.set(date, mappedDate)
    }

    console.log(mappedDate)

    clinic.save()

    return await timeslotModel.findById(timeslot._id).populate('dentist').populate('patient').populate('clinic')
}

/**
 * Find the timeslot by the id and deletes it from the database.
 */
async function cancelAppointment(timeslotID) {
    try {
        let timeslotReturn = await timeslotModel.findByIdAndDelete(timeslotID).populate("dentist").populate("patient").populate("clinic")
        await patientModel.findByIdAndDelete(timeslotReturn.patient)
        return {result: "Success", timeslot: timeslotReturn}

    } catch (e) {
        console.log(e)
        console.log("The appointment cancellation has failed")
        return {result: "Failure"}
    }
}

/**
 * Generates dummy data into the given clinic ID.
 * Generating dentist, timeslot and patient to fill up the db.
 * @param clinicId the id of clinic which will have the data generated in
 */
async function generateData(clinicId) {

    let clinic = await clinicModel.findById(clinicId).populate('timeslots')
    console.log(clinic)

    let thingTimeslots = []
    let thingDentists = []
    console.log('found clinic timeslots:')
    console.log(clinic.timeslots)

    const timeslot = new timeslotModel({
        startTime: "09:30",
        clinic: clinicId // <-- The ID of the clinic goes here
    });

    const patient = new patientModel({
        name: "Mathias Hallander",
        timeslot: timeslot._id
    });

    const dentist = new dentistModel({
        name: "Ergi Senja",
        clinic: clinicId
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

/**
 * Finds all the timeslots within a clinic together with the patient and dentist data
 * Then for each timeslots it takes the patient name, text, dentist name and timeSlot time
 * It stores it in the array.
 * @returns the clinicTimeslots array
 */
async function sendAppointmentInformation(intermediary) {
    let clinicTimeslots = [];

    const timeslots = await timeslotModel.find({clinic: intermediary}).populate("patient").populate("dentist")
    console.log(timeslots)
    try {
        timeslots.forEach(timeslot => {
            clinicTimeslots.push({
                id: timeslot._id,
                patient: {
                    name: timeslot.patient.name,
                    text: timeslot.patient.text
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
    console.log(clinicTimeslots)
    return clinicTimeslots
}

async function generateTimeslots(clinicId, dentistID, patientID) {
    let clinic = await clinicModel.findById(clinicId).populate('timeslots').populate('dentists')

    const timeslot = new timeslotModel({
        startTime: "09:30",
        dentist: dentistID,
        patient: patientID,
        clinic: clinicId // <-- The ID of the clinic goes here
    });
    timeslot.save()

    const timeslot2 = new timeslotModel({
        startTime: "11:30",
        dentist: dentistID,
        patient: patientID,
        clinic: clinicId // <-- The ID of the clinic goes here
    });
    timeslot2.save()

    const timeslot3 = new timeslotModel({
        startTime: "13:00",
        dentist: dentistID,
        patient: patientID,
        clinic: clinicId // <-- The ID of the clinic goes here
    });
    timeslot3.save()

    console.log(clinic.timeslots)

    let intermediaryTimeslots = {
        2022: {
            1: {
                1: [
                    timeslot,
                    timeslot2,
                    timeslot3
                ]
            }
        }
    }

    console.log(intermediaryTimeslots)

    //clinic.timeslots = intermediaryTimeslots

    clinic.save();
}

const appointmentsController = {
    bookedMailingData,
    makeAppointment,
    cancelAppointment,
    generateData,
    sendAppointmentInformation,
    reconnect,
    generateTimeslots
}

module.exports = appointmentsController