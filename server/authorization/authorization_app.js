const mongoose = require('mongoose');
const mqttHandler = require('../helpers/mqtt_handler');
const config = require('../helpers/config');

// Variables
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://' + config.authorizationUser.name + ':' + config.authorizationUser.password + '@cluster0.lj881zv.mongodb.net/?retryWrites=true&w=majority';
//const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/UserDB';

// MQTT Client
const mqttClient = new mqttHandler(config.authorizationUser.handler)
mqttClient.connect()

// Connect to MongoDB
mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true}, function (err) {
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
});

// MQTT subscriptions
mqttClient.subscribeTopic('auth')

// When a message arrives, respond to it or propagate it further
mqttClient.mqttClient.on('message', function (topic, message) {
    console.log(config.authorizationUser.handler + " service received MQTT message")
    console.log(message.toString());

    switch (topic) {
        case "test":
            mqttClient.sendMessage('testAppointment', 'Testing callback')
            break;
        case 'auth':
            mqttClient.sendMessage('authTest', 'Authorization confirmed')
            break;
    }
});

module.exports = mqttClient;

