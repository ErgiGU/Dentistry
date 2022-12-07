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
mqttClient.mqttClient.on('message', async function (topic, message) {
    console.log(config.clinicUser.handler + " service received MQTT message")
    console.log(message.toString());

    switch (topic) {
        case 'test':
            mqttClient.sendMessage('testAppointment', 'Testing callback')
            break;
        case 'mapDataRequest':
            const body = await clinicData.mapDataRequest()
            console.log(JSON.stringify(body) + ": is the body")
            mqttClient.sendMessage(JSON.parse(message).id + '/mapDataResponse', JSON.stringify(body))
            break;
    }
});

module.exports = mqttClient;