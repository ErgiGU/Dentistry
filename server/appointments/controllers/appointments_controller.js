/**
 * All the mongoose manipulation for appointments component is contained here
 * @author Burak Askan (@askan)
 */
const mongooseHandler = require('../../helpers/mongoose_handler')
const timeslotSchema = require('../../helpers/schemas/timeslot')
const dentistSchema = require('../../helpers/schemas/dentist')
const patientSchema = require('../../helpers/schemas/patient')
const clinicSchema = require('../../helpers/schemas/clinic')
const resolvePath = require('object-resolve-path')
const datefns = require('date-fns')

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
 * @param timeslotID the id of the timeslot just booked
 * @returns {Promise<{patientData: {name: string, text: string, email}, dentistData: {name: string, email}, timeslotTime, clinicData: {address, name, email}}>} JSON required for the emails
 */
async function getTimeslotInfo(timeslotID) {
    await timeslotModel.findById({_id: timeslotID}).populate('clinic').populate('dentist').populate('patient')
    let timeslotPopulatedInfo = await timeslotModel.findById(timeslotID).populate('clinic').populate('dentist').populate('patient')
    timeslotPopulatedInfo = JSON.stringify(timeslotPopulatedInfo)
    timeslotPopulatedInfo = JSON.parse(timeslotPopulatedInfo)
    timeslotPopulatedInfo._id = "id"
    timeslotPopulatedInfo.clinic._id = "id"
    timeslotPopulatedInfo.clinic.dentists = ["id"]
    timeslotPopulatedInfo.clinic.password = "password"
    timeslotPopulatedInfo.clinic.mapStorage = {}
    timeslotPopulatedInfo.dentist._id = "id"
    timeslotPopulatedInfo.dentist.timeslots = ["id"]
    timeslotPopulatedInfo.dentist.clinic = "id"
    timeslotPopulatedInfo.patient._id = "id"
    timeslotPopulatedInfo.patient.timeslots = ["id"]
    return timeslotPopulatedInfo
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
        patient = new patientModel({
            name: patientInfo.name,
            email: patientInfo.email,
            dateOfBirth: patientInfo.dateOfBirth,
            text: patientInfo.text
        });
    }

    if (dentist === null) {

    }

    const timeslot = new timeslotModel({
        startTime: time,// <-- The start-time of the selected timeslot goes here
        date: datefns.formatISO(datefns.parseISO(date), {representation: "date"}),
        clinic: clinicId,
        patient: patient._id,
        dentist: dentist._id
    });

    patient.timeslots.push(timeslot._id)
    patient.save()
    timeslot.save()

    let mappedDate = clinic.mapStorage.get(date)

    try {
        if (mappedDate !== null && mappedDate.timeslots !== null && mappedDate.timeslots.length > 0) {
            mappedDate.timeslots.push({_id: timeslot._id})
        }
    } catch (e) {
        mappedDate = {
            timeslots: [timeslot._id]
        }
        clinic.mapStorage.set(date, mappedDate)
    }
    clinic.save()

    console.log(timeslot._id)
    return await timeslot._id
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
 * Finds all the timeslots within a clinic together with the patient and dentist data
 * Then for each timeslots it takes the patient name, text, dentist name and timeSlot time
 * It stores it in the array.
 * @returns the clinicTimeslots array
 */
async function sendAppointmentInformation(intermediary) {
    let response = {
        body: {
            sortedArray: []
        }
    };
    const timeslots = await timeslotModel.find({clinic: intermediary}).populate("patient dentist")

    try {
        let unsortedMap = new Map()
        timeslots.forEach(timeslot => {
            let intermediary = {
                id: timeslot._id,
                patient: {
                    name: timeslot.patient.name,
                    text: timeslot.patient.text
                },
                dentist: {
                    name: timeslot.dentist.name
                },
                timeslot: timeslot.startTime
            }
            let currentDate = datefns.formatISO(datefns.parseISO(timeslot.date), {representation: "date"})
            let current = unsortedMap.get(currentDate)
            let array
            if (current === undefined) {
                array = [intermediary]
                unsortedMap.set(currentDate, array)
            } else {
                console.log('adding to ' + current)
                current.push(intermediary)
                unsortedMap.set(currentDate, current)
                console.log(unsortedMap.get(currentDate))
            }
        })
        let intermediaryArray = Array.from(unsortedMap, ([key, value]) => ({key, value}));
        intermediaryArray.sort(function(a,b){
            return (new Date(a.key) - new Date(b.key));
        });
        response.body.sortedArray = intermediaryArray;
        console.log(response.body.sortedArray[0].value[0])
        return response
    } catch (e) {
        console.log(e)
        return e
    }
}

const appointmentsController = {
    getTimeslotInfo,
    makeAppointment,
    cancelAppointment,
    sendAppointmentInformation,
    reconnect,
}

module.exports = appointmentsController