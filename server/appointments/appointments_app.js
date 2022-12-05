const mqttHandler = require('../helpers/mqtt_handler');
const config = require('../helpers/config');
const {appointments_mailer} = require("./controllers/appointments_mailer");

// Variables

// MQTT Client
const mailer = new appointments_mailer
const mqttClient = new mqttHandler(config.appointmentUser.handler)
mqttClient.connect()

// MQTT subscriptions
mqttClient.subscribeTopic('test')
mqttClient.subscribeTopic('appointment')

// When a message arrives, respond to it or propagate it further
mqttClient.mqttClient.on('message', function (topic, message) {
    let intermediary = JSON.parse(message)
    console.log(config.appointmentUser.handler + " service received MQTT message")
    console.log(intermediary)

    switch (topic) {
        case 'schema':
            mqttClient.sendMessage('testAppointment', "newClinic")
            break;
        case 'appointment':
            testAppointment(intermediary)
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