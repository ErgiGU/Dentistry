const mongooseHandler = require('../../helpers/mongoose_handler')
const clinicSchema = require('../../helpers/schemas/clinic')
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

function reconnect(mongoURI) {
    mongooseClient.close()
    mongooseClient = new mongooseHandler(mongoURI)
    mongooseClient.connect().then(() => {
        createModels()
    }, null)
}

function createModels() {
    clinicModel = mongooseClient.model('clinic', clinicSchema)
}

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
    }
}

//gets dentist workweek
async function getWorkweek(req) {
    const clinicID = req.body.id
    console.log(clinicID)
    const dentists = await dentistModel.find({clinicID})
    let message;
    if (dentists){
        message = {
            dentistsID: dentists.id,
            dentistsWork: dentists.workweek
        }
    } else {
        message = {
            status: 404,
            text: 'Dentists is not registered'
        }
    }
    return JSON.stringify(message);
}

//updates dentist workweek
async function setWorkweek(req) {
    const email = req.body.email
    console.log(email)
    const dentist = await dentistModel.findOne({email})
    let message;
    if (dentist) {
        {
            dentist.monday = req.body.monday || dentist.monday,
                dentist.tuesday = req.body.tuesday || dentist.tuesday,
                dentist.wednesday = req.body.wednesday || dentist.wednesday,
                dentist.thursday = req.body.thursday || dentist.thursday,
                dentist.friday = req.body.friday || dentist.friday
        }
        dentist.save();
        console.log("Workweek successfully updated")
        console.log(clinic)
    } else {
        message = {
            status: 404,
            text: 'Dentist is not registered'
        }
    }
    return JSON.stringify(message);
}


const clinicController = {
    mapDataRequest,
    reconnect,
    getWorkweek,
    setWorkweek
}

module.exports = clinicController
