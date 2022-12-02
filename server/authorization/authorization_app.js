const mqttHandler = require('../helpers/mqtt_handler');
const config = require('../helpers/config');

// MQTT Client
const mqttClient = new mqttHandler(config.authorizationUser.handler)
mqttClient.connect()

// MQTT subscriptions
mqttClient.subscribeTopic('auth')

// When a message arrives, respond to it or propagate it further
mqttClient.mqttClient.on('message', function (topic, message) {
    let intermediary = JSON.parse(message)
    console.log(config.authorizationUser.handler + " service received MQTT message")
    console.log(intermediary);

    switch (topic) {
        case "test":
            mqttClient.sendMessage('testAppointment', 'Testing callback')
            break;
        case 'auth':
            mqttClient.sendMessage('authTest', 'Authorization confirmed')
            break;
    }
});

// Function declaration
/**
 * Test function
 * @param message MQTT message
 */
function testMessage(message) {
    mqttClient.sendMessage(message.id + '/appointmentResponse', JSON.stringify(newClinic))
}

module.exports = mqttClient;