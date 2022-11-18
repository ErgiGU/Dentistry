const mongoose = require('mongoose');
const mqttHandler = require('../helpers/mqtt_handler');
const config = require('../helpers/config');

// Variables
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://' + config.clinicUser.name + ':' + config.clinicUser.password + '@cluster0.lj881zv.mongodb.net/?retryWrites=true&w=majority';
//const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ClinicDB';

// MQTT Client
const mqttClient = new mqttHandler()
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

mqttClient.subscribeTopic('test')

// When a message arrives, console.log it
mqttClient.mqttClient.on('message', function (topic, message) {
    console.log("Appointments service received MQTT message")
    console.log(message.toString());
    if (topic === 'test') {
        mqttClient.sendMessage('testAppointment', 'Testing callback')
    }
});

module.exports = mqttClient;