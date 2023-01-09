/**
 * All mqtt related operations for the authorization component are done here
 * @author Ergi Senja (@ergi)
 */
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
mqttClient.subscribeTopic('testingTestingRequest');
mqttClient.subscribeTopic("login");

// When a message arrives, respond to it or propagate it further
try {
    /**
     * The MQTT listener that receives incoming messages and sends back messages after data manipulation.
     */
    mqttClient.mqttClient.on('message', function (topic, message) {
        let intermediary = JSON.parse(message);
        console.log(config.module_config.authorizationUser.handler + " service received MQTT message")
        console.log(intermediary);

        switch (topic) {
            case 'auth':
                mqttClient.sendMessage('authTest', 'Authorization confirmed')
                break;
            //topic for registration
            case 'registration':
                authorization_controller.register(intermediary).then(res => {
                    let response = {
                        response: ""
                    }
                    if (res === "success!") {
                        response.response = "registration successful";

                    } else if (res === "email already exists") {
                        response.response = "email already exists";
                    } else {
                        response.response = "registration failed";
                    }
                    mqttClient.sendMessage(intermediary.clientId + "/register", JSON.stringify(response));
                });
                break;
            //topic for login
            case "login":
                const emailLogin = intermediary.body.email;
                const password = intermediary.body.password;
                authorization_controller.loginClinic(emailLogin, password).then(res => {

                    if (res.response === "login successful") {

                        mqttClient.sendMessage(intermediary.clientId + "/loginClient", JSON.stringify(res));
                    } else {
                        const response = {
                            response: "Invalid email/password"
                        }
                        mqttClient.sendMessage(intermediary.clientId + "/loginClient", JSON.stringify(response))
                    }
                })
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
} catch (e) {
    console.log(e)
    console.log("Message was received but caused a crash.")
}


module.exports = mqttClient;