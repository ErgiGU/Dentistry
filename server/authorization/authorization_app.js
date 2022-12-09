const mqttHandler = require('../helpers/mqtt_handler');
let config
try {
    config = require('../helpers/config');
} catch (e) {
    config = require('../helpers/dummy_config')
}

// MQTT Client
const mqttClient = new mqttHandler(config.module_config.authorizationUser.name, config.module_config.authorizationUser.password, config.module_config.authorizationUser.handler)
mqttClient.connect()

// MQTT subscriptions
mqttClient.subscribeTopic('auth')
mqttClient.subscribeTopic('test')
mqttClient.subscribeTopic('testingTestingRequest')

// When a message arrives, respond to it or propagate it further
mqttClient.mqttClient.on('message', function (topic, message) {
    let intermediary = JSON.parse(message)
    console.log(config.module_config.authorizationUser.handler + " service received MQTT message")
    console.log(intermediary);

    switch (topic) {
        case "firstTest":
            mqttClient.sendMessage('testAppointment', 'Testing callback')
            break;
        case 'auth':
            mqttClient.sendMessage('authTest', 'Authorization confirmed')
            break;
        case 'testingTestingRequest':
            mqttClient.sendMessage('testingTesting', 'ToothyClinic')
            break;
        case 'test':
            process.exit()
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