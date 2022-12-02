const mqttHandler = require('../helpers/mqtt_handler');
const config = require('../helpers/config');

// MQTT Client
const mqttClient = new mqttHandler(config.clinicUser.handler)
mqttClient.connect()

// MQTT subscriptions
mqttClient.subscribeTopic('test')

// When a message arrives, respond to it or propagate it further
mqttClient.mqttClient.on('message', function (topic, message) {
    console.log(config.clinicUser.handler + " service received MQTT message")
    console.log(message.toString());

    switch (topic) {
        case 'test':
            mqttClient.sendMessage('testAppointment', 'Testing callback')
            break;
    }
});

module.exports = mqttClient;