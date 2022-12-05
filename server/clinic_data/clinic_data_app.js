const mqttHandler = require('../helpers/mqtt_handler');
let config
try {
    config = require('../helpers/config');
} catch (e) {
    config = require('../helpers/dummy_config')
}

// MQTT Client
const mqttClient = new mqttHandler(config.clinicUser.name, config.clinicUser.password, config.clinicUser.handler)
mqttClient.connect()

// MQTT subscriptions
mqttClient.subscribeTopic('test')
mqttClient.subscribeTopic('testingTestingRequest')

// When a message arrives, respond to it or propagate it further
mqttClient.mqttClient.on('message', function (topic, message) {
    console.log(config.clinicUser.handler + " service received MQTT message")
    console.log(message.toString());

    switch (topic) {
        case 'firstTest':
            mqttClient.sendMessage('testAppointment', 'Testing callback')
            break;
        case 'testingTestingRequest':
            mqttClient.sendMessage('testingTesting', 'ToothyClinic')
            break;
        case 'test':
            process.exit()
            break;
    }
});

module.exports = mqttClient;