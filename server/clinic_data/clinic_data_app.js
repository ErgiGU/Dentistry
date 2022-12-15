const mqttHandler = require('../helpers/mqtt_handler');
const clinicData = require('./controllers/clinic_data_controller')
let config
try {
    config = require('../helpers/config-server');
} catch (e) {
    config = require('../helpers/dummy_config')
}

// MQTT Client
const mqttClient = new mqttHandler(config.module_config.clinicUser.name, config.module_config.clinicUser.password, config.module_config.clinicUser.handler)
mqttClient.connect()

// MQTT subscriptions
mqttClient.subscribeTopic('test')
mqttClient.subscribeTopic('mapDataRequest')
mqttClient.subscribeTopic('testingTestingRequest')

// When a message arrives, respond to it or propagate it further
mqttClient.mqttClient.on('message', async function (topic, message) {
    console.log(config.module_config.clinicUser.handler + " service received MQTT message")
    console.log(message.toString());

    switch (topic) {
        case 'firstTest':
            mqttClient.sendMessage('testAppointment', 'Testing callback')
            break;
        case 'mapDataRequest':
            const body = await clinicData.mapDataRequest()
            mqttClient.sendMessage(JSON.parse(message).id + '/mapDataResponse', JSON.stringify(body))
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