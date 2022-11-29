const mqttHandler = require('../helpers/mqtt_handler');
const config = require('../helpers/config');
const clinicData = require('../helpers/schemas/clinic')

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
    if (topic === 'mapDataRequest') {
        mapDataRequest()
    }
});

function mapDataRequest() {
    let clinicNames = []
    let clinicCoordinates = []
    let clinicDescrip = []
    clinicData.find(function (err, clinic) {
        try {
            if (err) {
                return next(err);
            }
            clinicNames.push(clinic.name)
            clinicCoordinates.push(clinic.coordinates)
            clinicDescrip.push(clinic.descripText)
        }catch(err) {
            console.log(err)
            mqttClient.sendMessage('mapDataResponse', err)
        }
    })
    mqttClient.sendMessage('mapDataResponse', (clinicData.name, clinicData.coordinates, clinicData.descripText))
}
module.exports = mqttClient;