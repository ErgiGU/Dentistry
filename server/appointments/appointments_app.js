/**
 * All mqtt related operations for the appointments component are done here
 * @author Burak Askan (@askan)
 */
const mqttHandler = require('../helpers/mqtt_handler');
const appointments_controller = require("./controllers/appointments_controller");
const appointments_mailer = require("./controllers/appointments_mailer");

let config
try {
    config = require('../helpers/config-server');
} catch (e) {
    config = require('../helpers/dummy_config')
}

// MQTT Client
const mqttClient = new mqttHandler(config.module_config.appointmentUser.name, config.module_config.appointmentUser.password, config.module_config.appointmentUser.handler)
mqttClient.connect()

// Variables
const mailer = new appointments_mailer

// MQTT subscriptions
mqttClient.subscribeTopic('test')
mqttClient.subscribeTopic('initiateTesting')
mqttClient.subscribeTopic('appointment')
mqttClient.subscribeTopic('testingTestingRequest')
mqttClient.subscribeTopic('bookTimeslot')
mqttClient.subscribeTopic('generateData')
mqttClient.subscribeTopic('cancelBookedTimeslot')
mqttClient.subscribeTopic('sendAppointmentInformation')
mqttClient.subscribeTopic('cancelAppointment')


// When a message arrives, respond to it or propagate it further
mqttClient.mqttClient.on('message', function (topic, message) {
    let intermediary = JSON.parse(message)
    console.log(config.module_config.appointmentUser.handler + " service received MQTT message")
    console.log(intermediary)

    switch (topic) {
        case 'schema':
            mqttClient.sendMessage('testAppointment', "newClinic")
            break;
        case 'appointment':
            testAppointment(intermediary)
            break;
        case 'testingTestingRequest':
            mqttClient.sendMessage('testingTesting', 'ToothyClinic')
            break;
        case 'generateData':
            const dataResult = waitGenerateData()
            break;
        case 'bookTimeslot':
            const bookTimeslotResult = bookAppointment(intermediary)
            const bookingRes = {
                body: {
                    message: bookTimeslotResult //If the whole thing has succeeded or failed.
                }
            }
            mqttClient.sendMessage(intermediary.client_id + "/bookTimeslot", JSON.stringify(bookingRes))
            break;
        case 'cancelBookedTimeslot':
            //Cancels the booked timeslot
            const cancelTimeslotResult = cancelAppointment(intermediary)
            mqttClient.sendMessage(intermediary.client_id + "/bookTimeslot", JSON.stringify(cancelRes))
            break;
        case 'test':
            process.exit()
            break;
        default:
            console.log('topic: ' + topic)
            console.log('message: ' + message)
            break;
    }
});

async function waitGenerateData() {
    await appointments_controller.generateData("6391e39a3e08ac910fbede6f")
}

async function waitMakeTimeslots(message) {

    const clinicID = message.clinicID
    const dentistID = message.dentistID
    const patientInfo = message.patientInfo
    const timeslotTime = message.timeslotTime

    return appointments_controller.makeAppointment(clinicID, dentistID, patientInfo, timeslotTime);
}

async function waitMailData(clinicID, timeslotID) {
    return appointments_controller.bookedMailingData(clinicID, timeslotID);
}

async function waitClinicNotifMail(mailingData) {
    return await mailer.sendAppointmentNotifClinic(mailingData.patientData, mailingData.timeslotTime, mailingData.clinicData.email, mailingData.dentistData)
}

async function waitPatientNotifMail(mailingData) {
    return await mailer.sendAppointmentNotifPatient(mailingData.patientData.email, mailingData.timeslotTime, mailingData.clinicData, mailingData.dentistData)
}

/**
 * Returns the cancelAppointment function called from the controller.
 */
async function waitDeleteTimeslot(message) {
    return await appointments_controller.cancelAppointment(message.timeslotID)
}

async function waitBookAppointment(message) {
    return await bookAppointment(message)
}

// Function declaration
/**
 * Test function extracted from topic switcher
 * @param message MQTT message
 */
function testAppointment(message) {
    const newClinic = new timeSlotModel({
        startTime: Date.parse(message.body.startTime),
        dentist: "6386284314d29ecf98a61c70"
    });
    newClinic.save(function (err) {
        if (err) {
            console.log(err);
        }
        console.log('successfully saved')
    });
    mqttClient.sendMessage(message.id + '/appointmentResponse', JSON.stringify(newClinic))
}

/**
 * A method which calls mongoose manipulation methods that all related to the process of booking an appointment
 * @param intermediary The JSON which is received by the service
 * @returns {Promise<string>} The success or failure message
 */
async function bookAppointment(intermediary) {
    //Creates a timeslot. Returns the timeslot JSON.
    const timeslot = await waitMakeTimeslots(intermediary.body)
    console.log(timeslot)
    //Takes the ID of the timeslot JSON and ID. Returns success or failure of emailing.
    const mailingData = await waitMailData(intermediary.body.clinicID, timeslot._id)
    const mailingPatient = await waitPatientNotifMail(mailingData)
    const mailingClinic = await waitClinicNotifMail(mailingData)
    if (mailingPatient === "Success" && mailingClinic === "Success") {
        console.log("Successful Email")
        return {response: "Success"}
    } else {
        console.log("Failure to Email")
        return {response: "Failure"}
    }

}

async function cancelAppointment(intermediary) {
    //METHOD CALL FOR DB MANIPULATION THAT DELETES THE TIMESLOT BUT RETURNS IT
    const canceledTimeslot = await waitDeleteTimeslot(intermediary.body)
    if(canceledTimeslot.result === "Failure") {
        return {response: "Failure"}
    }
    console.log(canceledTimeslot)
    const mailCancelation = mailer.sendAppointmentCancelNotif(canceledTimeslot.timeslot.patient.email, canceledTimeslot.timeslot.startTime, canceledTimeslot.timeslot.clinic, canceledTimeslot.timeslot.dentist)
    if (mailCancelation === "Success") {
        return {response: "Success"}
    } else {
        return {response: "Failure"}
    }
}



module.exports = mqttClient;