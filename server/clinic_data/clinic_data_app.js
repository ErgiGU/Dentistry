const mqttHandler = require('../helpers/mqtt_handler');
const config = require('../helpers/config');
const clinicData = require('./controllers/clinic_data_controller.js');
const clinic = {
    "_id": {
        "$oid": "638e488517a8fd8e8c9bf872"
    },
    "name": "Your Dentist",
        "password": "hey12345",
        "email": "dantist@hotmail.se",
        "owner": "Dan Tist",
        "dentists": [],
        "timeslots": [],
        "address": "Spannmålsgatan 20",
        "city": "Gothenburg",
        "coordinate": {
        "longitude": 11.969388,
            "latitude": 57.707619
    },
    "openingHours": {
        "monday": {
            "start": "09:00",
                "end": "17:00"
        },
        "tuesday": {
            "start": "08:00",
                "end": "17:00"
        },
        "wednesday": {
            "start": "07:00",
                "end": "16:00"
        },
        "thursday": {
            "start": "09:00",
                "end": "17:00"
        },
        "friday": {
            "start": "09:00",
                "end": "15:00"
        }
    }
}
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
            mqttClient.sendMessage(message.id +'editInfoResponse', clinicData.editInfo(intermediary).toString())
            break;
    }
});

module.exports = mqttClient;