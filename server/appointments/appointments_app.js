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
    mqttClient.mqttClient.on('message', async function (topic, message) {
        let intermediary = JSON.parse(message)
        console.log(config.module_config.appointmentUser.handler + " service received MQTT message")
        console.log('topic: ' + topic)
        console.log(intermediary)

        switch (topic) {
            case 'schema':
                mqttClient.sendMessage('testAppointment', "newClinic")
                break;
            case 'bookAppointment':
                appointments_controller.makeAppointment(intermediary.body.clinicId, intermediary.body.dentistID, intermediary.body.patientInfo, intermediary.body.date, intermediary.body.time).then(timeslotID => {
                    console.log('id:')
                    console.log(timeslotID)
                    setTimeout(() => {
                        appointments_controller.getTimeslotInfo(timeslotID, intermediary.body.date).then(timeslot => {
                            waitPatientNotifMail(timeslot)
                            waitClinicNotifMail(timeslot)
                            console.log('found timeslot:')
                            console.log(timeslot)
                            mqttClient.sendMessage(intermediary.clientId + '/appointmentResponse', JSON.stringify(timeslot))
                        })
                    }, 5000)
                })
                break;
            case 'testingTestingRequest':
                const messageSending = {
                    response: "ToothyClinic",
                    additional: "WillIt"
                }
                mqttClient.sendMessage('123/testingTesting', JSON.stringify(messageSending))
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
                    mqttClient.sendMessage(intermediary.clientId + "/appointmentInformationResponse", JSON.stringify(r))
                })
                break;
            case 'cancelAppointment':
                cancelAppointment(intermediary).then(r => {
                    mqttClient.sendMessage(intermediary.clientId + "/canceledAppointment", JSON.stringify(r))
                })
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
 * @returns {Promise<*[]>} the result of mongoose manipulations
 */
async function waitTimeslotData(intermediary) {
    return await appointments_controller.sendAppointmentInformation(intermediary.body.clinicId)
}

async function waitMakeTimeslots(message) {
    return await appointments_controller.makeAppointment(message.clinicId, message.dentistID, message.patientInfo, message.date, message.time)
}

async function waitMailData(timeslotID) {
    return await appointments_controller.getTimeslotInfo(timeslotID);
}

async function waitClinicNotifMail(mailingData) {
    return await mailer.sendAppointmentNotifClinic(mailingData.patient, mailingData.startTime, mailingData.clinic.email, mailingData.dentist)
}

async function waitPatientNotifMail(mailingData) {
    return await mailer.sendAppointmentNotifPatient(mailingData.patient.email, mailingData.startTime, mailingData.clinic, mailingData.dentist)
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
    console.log("This iss the timeslot " + JSON.stringify(timeslot))
    //Takes the ID of the timeslot JSON and ID. Returns success or failure of emailing.
    setTimeout(async () => {
        console.log(JSON.stringify(timeslot) + "help find")
        const mailingPatient = await waitPatientNotifMail(timeslot)
        const mailingClinic = await waitClinicNotifMail(timeslot)
        if (mailingPatient === "Success" && mailingClinic === "Success") {
            console.log("Successful Email")
            return timeslot
        } else {
            console.log("Failure to Email")
            return timeslot
        }
    },1500)
}

/**
 * A method which calls mongoose manipulation methods that all related to the process of canceling an appointment
 * @param intermediary The JSON which is received by the service
 * @returns {string} The success or failure string
 */
async function cancelAppointment(intermediary) {
    //METHOD CALL FOR DB MANIPULATION THAT DELETES THE TIMESLOT BUT RETURNS IT
    const cancelledTimeslot = await waitDeleteTimeslot(intermediary.body)
    if (cancelledTimeslot.result === "Failure") {
        return {response: "Failure"}
    }
    console.log(cancelledTimeslot)
    const mailCancellation = mailer.sendAppointmentCancelNotif(cancelledTimeslot.timeslot.patient.email, cancelledTimeslot.timeslot.startTime, cancelledTimeslot.timeslot.clinic, cancelledTimeslot.timeslot.dentist)
    if (mailCancellation === "Success") {
        return {response: "Success"}
    } else {
        return {response: "Failure"}
    }
}


module.exports = mqttClient;