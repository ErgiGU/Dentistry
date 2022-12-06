const mqttHandler = require('../helpers/mqtt_handler');
const config = require('../helpers/config');
const clinicData = require('./controllers/clinic_data_controller')

// MQTT Client
const mqttClient = new mqttHandler(config.clinicUser.handler)
mqttClient.connect()

// MQTT subscriptions
mqttClient.subscribeTopic('test')
mqttClient.subscribeTopic('mapDataRequest')


// When a message arrives, respond to it or propagate it further
mqttClient.mqttClient.on('message', function (topic, message) {
    console.log(config.clinicUser.handler + " service received MQTT message")
    console.log(message.toString());

    switch (topic) {
        case 'test':
            mqttClient.sendMessage('testAppointment', 'Testing callback')
            break;
        case 'mapDataRequest':
            console.log("Map data reieved: " + JSON.parse(message))
            const body = clinicData.mapDataRequest()
            mqttClient.sendMessage(message.id + '/mapDataResponse', JSON.stringify(body))
            break;
    }
});

module.exports = mqttClient;