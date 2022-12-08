const mqttHandler = require('../helpers/mqtt_handler');
const config = require('../helpers/config');
const registerClinic = require('./controllers/authorization_controller');

// MQTT Client
const mqttClient = new mqttHandler(config.authorizationUser.handler)
mqttClient.connect()

// MQTT subscriptions
mqttClient.subscribeTopic('auth');
mqttClient.subscribeTopic('registration');
mqttClient.subscribeTopic("checkIfEmailExists");

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
            mqttClient.sendMessage('registrationResponse', "Here's the response");
            break;
        case 'checkIfEmailExists':
            const email = intermediary.body.email;
            const response =  registerClinic.emailExists(email).then(res=>{
                console.log(res);
                if(res === "email already exists"){
                    sendMessage("email already exists");
                }else{
                    sendMessage("email doesn't exist")
                }
                });
            console.log(response);

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

function  sendMessage(message) {
    mqttClient.sendMessage(message.id + '/',message)
}

module.exports = mqttClient;