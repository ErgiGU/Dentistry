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
mqttClient.subscribeTopic("login");

// When a message arrives, respond to it or propagate it further
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
            authorization_controller.register(intermediary).then(res=>{
                if(res === "success!"){
                    //sends the ok to the client for the registration
                    mqttClient.sendMessage(intermediary.client_id + "/register","registration successful");
                }else{
                    mqttClient.sendMessage(intermediary.client_id + "/register","registration failed");
                }
            });
            break;
        //topic for checking if the email already exists in the DB(used for registration)
        case 'checkIfEmailExists':
            const email = intermediary.body.email;
            authorization_controller.emailExists(email).then(res=>{
                if (res === "email already exists") {
                    mqttClient.sendMessage(intermediary.client_id + "/checkEmail","email already exists");
                }
            });
            break;
        //topic for login
        case "login":
            const emailLogin = intermediary.body.email;
            const password = intermediary.body.password;
            authorization_controller.loginClinic(emailLogin,password).then(res=>{

                if(res.message === "login successful"){
                    mqttClient.sendMessage(intermediary.client_id + "/loginClient",JSON.stringify(res));
                }else{
                    console.log("sent");
                    const message = {
                        message: "Invalid email/password"
                    }
                    mqttClient.sendMessage(intermediary.client_id + "/loginClient", JSON.stringify(message))
                }

            })

            break;
        case 'testingTestingRequest':
            mqttClient.sendMessage('testingTesting', 'ToothyClinic')
            break;
        case 'test':
            process.exit()
            break;
        case 'initiateTesting':
            authorization_controller.reconnect(config.admin_config.database_tester.mongoURI)
            break;
    }

});


module.exports = mqttClient;