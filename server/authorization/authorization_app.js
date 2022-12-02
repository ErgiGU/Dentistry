const mqttHandler = require('../helpers/mqtt_handler');
const config = require('../helpers/config');
const registerClinic = require('./controllers/authorization_controller');

// MQTT Client
const mqttClient = new mqttHandler(config.authorizationUser.handler)
mqttClient.connect()

// MQTT subscriptions
mqttClient.subscribeTopic('auth')
mqttClient.subscribeTopic('registration');

// When a message arrives, respond to it or propagate it further
mqttClient.mqttClient.on('message', function (topic, message) {
    let intermediary = JSON.parse(message)
    console.log(config.authorizationUser.handler + " service received MQTT message")
    console.log(intermediary);

    switch (topic) {
        case 'auth':
            mqttClient.sendMessage('authTest', 'Authorization confirmed')
            break;
        case 'registration':
           /* registerClinic.registerClinic(JSON.parse(message)).then(

            );*/
            console.log("got the message");
            mqttClient.sendMessage('registrationResponse', 'Heres the response');
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