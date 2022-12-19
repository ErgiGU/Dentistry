const mqttHandler = require('../helpers/mqtt_handler');
const authorization_controller = require('./controllers/authorization_controller');

let config
try {
    config = require('../helpers/config-server');
} catch (e) {
    config = require('../helpers/dummy_config')
}

// MQTT Client
const mqttClient = new mqttHandler(config.module_config.authorizationUser.name, config.module_config.authorizationUser.password, config.module_config.authorizationUser.handler)
mqttClient.connect()

// MQTT subscriptions
mqttClient.subscribeTopic('auth');
mqttClient.subscribeTopic('test');
mqttClient.subscribeTopic('initiateTesting')
mqttClient.subscribeTopic('registration');
mqttClient.subscribeTopic("checkIfEmailExists");
mqttClient.subscribeTopic('testingTestingRequest');

// When a message arrives, respond to it or propagate it further
try {
    mqttClient.mqttClient.on('message', function (topic, message) {
        let intermediary = JSON.parse(message);
        console.log(config.module_config.authorizationUser.handler + " service received MQTT message")
        console.log(intermediary);

        switch (topic) {
            case 'auth':
                mqttClient.sendMessage('authTest', 'Authorization confirmed')
                break;
            case 'registration':
                authorization_controller.register(intermediary).then(res=>{
                    console.log(res);
                    if(res==="success!") {
                        //sends the ok to the client for the registration
                        sendMessage(intermediary, "/register","registration successful");
                    }else{
                        sendMessage(intermediary, "/register","registration failed");
                    }
                });
                break;
            case 'checkIfEmailExists':
                const email = intermediary.body.email;
                authorization_controller.emailExists(email).then(res=>{
                    console.log(res);

                    if (res === "email already exists") {
                        sendMessage(intermediary,"/checkEmail","email already exists");
                    }
                });
                break;
            case 'testingTestingRequest':
                const messageSending = {
                    response: "ToothyClinic",
                    additional: "WillIt"
                }
                mqttClient.sendMessage('123/testingTesting', JSON.stringify(messageSending))
                break;
            case 'test':
                process.exit()
                break;
            case 'initiateTesting':
                authorization_controller.reconnect(config.admin_config.database_tester.mongoURI)
                break;
        }

    });
}catch (e) {
    console.log(e)
    console.log("Message was received but caused a crash.")
}


// Function declaration
/**
 * Test function
 * @param message MQTT message
 */
function sendMessage(intermediary,topic,message) {
    mqttClient.sendMessage( intermediary.id + topic, message)
}

module.exports = mqttClient;