const mqttHandler = require('../helpers/mqtt_handler');
const config = require('../helpers/config');

// MQTT Client
const mqttClient = new mqttHandler(config.appointmentUser.handler)
mqttClient.connect()

// MQTT subscriptions
mqttClient.subscribeTopic('test')
mqttClient.subscribeTopic('appointment')
mqttClient.subscribeTopic('testingTestingRequest')

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
        case 'testingTestingRequest':
            console.log('is something being sent out?')
            mqttClient.sendMessage('testingTesting', "wrong message")
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

module.exports = mqttClient;