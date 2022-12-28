/**
 * All the mongoose manipulation for clinic_data component is contained here
 * @author Burak Askan (@askan)
 */
const mongooseHandler = require('../../helpers/mongoose_handler')
const clinicSchema = require('../../helpers/schemas/clinic')
const dentistSchema = require('../../helpers/schemas/dentist')
const timeslotSchema = require('../../helpers/schemas/timeslot')
const patientSchema = require('../../helpers/schemas/patient')
let config
try {
    config = require('../../helpers/config-server');
} catch (e) {
    config = require('../../helpers/dummy_config')
}

// Connect to MongoDB
let mongooseClient = new mongooseHandler(config.module_config.clinicUser.mongoURI)
mongooseClient.connect().then(() => {
    createModels()
}, null)

let clinicModel
let dentistModel
let timeslotModel
let patientModel

function reconnect(mongoURI) {
    mongooseClient.close()
    mongooseClient = new mongooseHandler(mongoURI)
    mongooseClient.connect().then(() => {
        createModels()
    }, null)
}

function createModels() {
    clinicModel = mongooseClient.model('clinic', clinicSchema)
    dentistModel = mongooseClient.model('dentist', dentistSchema)
    timeslotModel = mongooseClient.model('timeslot', timeslotSchema)
    patientModel = mongooseClient.model('patient', patientSchema)
}

/**
 * Does mongoose manipulation to get the dentist with the given email
 * @param email the email of the individual clinic that is wanted
 * @returns {Promise<*>} the JSON of the individual clinic
 */
async function clinicData(email) {
    return await clinicModel.findOne({email: email})
}


/**
 * Does mongoose manipulation to get the dentist with the given email
 * @param email email of the wanted dentist
 * @returns {Promise<*>} the JSON of the individual dentist
 */
async function getDentist(email) {
    return await dentistModel.findOne({email: email})
}

/**
 * Does mongoose manipulations to get all JSON coordinates, opening hours, name and address of all clinics.
 * @returns {Promise<{clinics: *[]}|boolean>} JSON containing coordinates, opening hours, name and address of all clinics.
 */
async function mapDataRequest() {

    let clinicMapJSON = {
        clinics: []
    }

    let clinicErrorFlag = false
    const clinics = await clinicModel.find()
    try {

        clinics.forEach(clinic => {

            let openingHourString

            if(clinic.openingHours.monday.start) {
                openingHourString = "Opening Hours: " +
                    "Monday: " + clinic.openingHours.monday.start + " - " + clinic.openingHours.monday.end +
                    "  Tuesday: " + clinic.openingHours.tuesday.start + " - " + clinic.openingHours.tuesday.end +
                    "  Wednesday: " + clinic.openingHours.wednesday.start + " - " + clinic.openingHours.wednesday.end +
                    "  Thursday: " + clinic.openingHours.thursday.start + " - " + clinic.openingHours.thursday.end +
                    "  Friday : " + clinic.openingHours.friday.start + " - " + clinic.openingHours.friday.end
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
    }
}

async function removeData() {
    console.log("We are entering here")
    try {
        await clinicModel.deleteMany()
        await timeslotModel.deleteMany()
        await dentistModel.deleteMany()
        await patientModel.deleteMany()
    } catch (e) {
        return {
            response: "Failure"
        }
    }
    return {
        response: "Success"
    }
}

const clinicController = {
    removeData,
    mapDataRequest,
    reconnect,
    clinicData,
    getDentist
}

module.exports = clinicController