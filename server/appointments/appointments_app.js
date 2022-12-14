const mqttHandler = require('../helpers/mqtt_handler');
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
        case 'test':
            process.exit()
            break;
        default:
            console.log('topic: ' + topic)
            console.log('message: ' + message)
            break;
    }
});

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

function bookAppointment(input) {
    // mongodb manipulation
    mailer.sendAppointmentMail(input.recipient, input.timeslot, input.clinic)
    mqttClient.sendMessage('bookAppointment', 'ADD MESSAGE HERE') //TODO: Add a message here.
    //mqtt message response
}

module.exports = mqttClient;