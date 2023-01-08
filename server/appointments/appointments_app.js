/**
 * All mqtt related operations for the appointments component are done here
 * @author Burak Askan (@askan)
 */
const mqttHandler = require('../helpers/mqtt_handler');
const appointments_controller = require("./controllers/appointments_controller")
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
mqttClient.subscribeTopic('appointment')
mqttClient.subscribeTopic('testingTestingRequest')
mqttClient.subscribeTopic('bookAppointment')
mqttClient.subscribeTopic('bookTimeslot')
mqttClient.subscribeTopic('initiateTesting')
mqttClient.subscribeTopic('generateData')
mqttClient.subscribeTopic('cancelBookedTimeslot')
mqttClient.subscribeTopic('sendAppointmentInformation')
mqttClient.subscribeTopic('cancelAppointment')
mqttClient.subscribeTopic('generateTimeSlots')


// When a message arrives, respond to it or propagate it further
try {
    /**
     * The MQTT listener that receives incoming messages and sends back messages after data manipulation.
     */
    mqttClient.mqttClient.on('message', function (topic, message) {
        let intermediary = JSON.parse(message)
        console.log(config.module_config.appointmentUser.handler + " service received MQTT message")
        console.log('topic: ' + topic)
        console.log(intermediary)

        switch (topic) {
            case 'schema':
                mqttClient.sendMessage('testAppointment', "newClinic")
                break;
            case 'bookAppointment':
                waitMakeTimeslots(intermediary.body).then(res => {
                    mqttClient.sendMessage(intermediary.clientId + '/appointmentResponse', JSON.stringify(res))
                })
                break;
            case 'testingTestingRequest':
                const messageSending = {
                    response: "ToothyClinic",
                    additional: "WillIt"
                }
                mqttClient.sendMessage('123/testingTesting', JSON.stringify(messageSending))
                break;
            case 'generateTimeSlots':
                appointments_controller.generateTimeslots('63af60e44e09e582e395a69d', '63af4ee39556e442b5e1dc3e', '63af50fc4d37ce68a1981263').then(r => {});
                break;
            case 'generateData':
                const dataResult = waitGenerateData()
                break;
            case 'bookTimeslot':
                waitBookAppointment(intermediary).then(r => {
                    const bookingRes = {
                        response: r //If the whole thing has succeeded or failed.
                    }
                    mqttClient.sendMessage(intermediary.clientId + "/bookTimeslot", JSON.stringify(bookingRes))
                })
                break;
            case 'sendAppointmentInformation':
                waitTimeslotData(intermediary).then(r => {
                    if (intermediary.body.test) {
                        r = JSON.stringify(r)
                        r = JSON.parse(r)
                        r[0].id = "id"
                    }
                    mqttClient.sendMessage(intermediary.id + "/appointmentInformationResponse", JSON.stringify(r))
                })
                break;
            case 'cancelAppointment':
                cancelAppointment(intermediary).then(r => {
                    mqttClient.sendMessage(intermediary.clientId + "/canceledAppointment", JSON.stringify(r))
                })
                break;
            case 'cancelBookedTimeslot':
                //Cancels the booked timeslot
                const cancelTimeslotResult = cancelAppointment(intermediary)
                mqttClient.sendMessage(intermediary.clientId + "/bookTimeslot", JSON.stringify(cancelRes))
                break;
            case 'test':
                process.exit()
                break;
            case 'initiateTesting':
                appointments_controller.reconnect(config.admin_config.database_tester.mongoURI)
                break;
            default:
                console.log('topic: ' + topic)
                console.log('message: ' + message)
                break;
        }
    });
} catch (e) {
    console.log(e)
    console.log("Message was received but caused a crash.")
}

/**
 * Below are wrapper async functions to avoid making other function async when they don't need to be.
 * @returns {Promise<void>} the result of mongoose manipulations
 */

async function waitTimeslotData(intermediary) {
    console.log(JSON.stringify(intermediary.body))
    return await appointments_controller.sendAppointmentInformation(intermediary.body.clinicID)
}

async function waitGenerateData() {
    await appointments_controller.generateData('6391e39a3e08ac910fbede6f')
}

async function waitMakeTimeslots(message) {
    return appointments_controller.makeAppointment(message.clinicID, message.dentistID, message.patientInfo, message.date, message.time);
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

async function waitDeleteTimeslot(message) {
    return await appointments_controller.cancelAppointment(message.timeslotID)
}

async function waitBookAppointment(message) {
    return await bookAppointment(message)
}

/**
 * A method which calls mongoose manipulation methods that all related to the process of booking an appointment
 * @param intermediary The JSON which is received by the service
 * @returns {Promise<{response: string}>} The success or failure message
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

/**
 * A method which calls mongoose manipulation methods that all related to the process of canceling an appointment
 * @param intermediary The JSON which is received by the service
 * @returns {string} The success or failure string
 */
async function cancelAppointment(intermediary) {
    //METHOD CALL FOR DB MANIPULATION THAT DELETES THE TIMESLOT BUT RETURNS IT
    const canceledTimeslot = await waitDeleteTimeslot(intermediary.body)
    if (canceledTimeslot.result === "Failure") {
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