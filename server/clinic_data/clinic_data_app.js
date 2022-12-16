const mqttHandler = require('../helpers/mqtt_handler');
const clinic_data_controller = require('./controllers/clinic_data_controller');

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
mqttClient.subscribeTopic('initiateTesting')
mqttClient.subscribeTopic('mapDataRequest')
mqttClient.subscribeTopic('testingTestingRequest')

// When a message arrives, respond to it or propagate it further
mqttClient.mqttClient.on('message', async function (topic, message) {
    let intermediary = JSON.parse(message)
    console.log(config.module_config.clinicUser.handler + " service received MQTT message")
    console.log(intermediary);

    switch (topic) {
        case 'firstTest':
            mqttClient.sendMessage('testAppointment', 'Testing callback')
            break;
        case 'mapDataRequest':
            const body = await clinic_data_controller.mapDataRequest()
            mqttClient.sendMessage(intermediary.id + '/mapDataResponse', JSON.stringify(body))
            break;
        case 'testingTestingRequest':
            mqttClient.sendMessage('testingTesting', 'ToothyClinic')
            break;
        case 'test':
            process.exit()
            break;
        case 'initiateTesting':
            clinic_data_controller.reconnect(config.admin_config.database_tester.mongoURI)
            break;
        case 'update':
            mqttClient.sendMessage(intermediary.id + '/responseWeek', clinic_data_controller.setWorkweek(intermediary.body.dentist, intermediary.body.workweek))
            break;
    }
});

module.exports = mqttClient;