const mqttHandler = require('../helpers/mqtt_handler');
const config = require('../helpers/config');
const clinicData = require('./controllers/clinic_data_controller.js');

// MQTT Client
const mqttClient = new mqttHandler(config.clinicUser.handler)
mqttClient.connect()

// MQTT subscriptions
mqttClient.subscribeTopic('test')
mqttClient.subscribeTopic('editInfo')
mqttClient.subscribeTopic('changePassword')


// When a message arrives, respond to it or propagate it further
mqttClient.mqttClient.on('message', function (topic, message) {
    let intermediary = JSON.parse(message)
    console.log(config.clinicUser.handler + " service received MQTT message")
    console.log(message.toString());

    switch (topic) {
        case 'test':
            mqttClient.sendMessage('testAppointment', 'Testing callback')
            break;
        case 'editInfo':
            clinicData.editInfo(intermediary).then(res => {
                mqttClient.sendMessage(intermediary.id + '/editInfoResponse', res)
            })
            break;
        case 'changePassword':
            clinicData.changePassword(intermediary).then(res => {
                mqttClient.sendMessage(intermediary.id + '/changePasswordResponse', res)
            })
            break;
    }
});

module.exports = mqttClient;