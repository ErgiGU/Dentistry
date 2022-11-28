const mongoose = require('mongoose');
const mqttHandler = require('../helpers/mqtt_handler');
const config = require('../helpers/config');

const Clinic = require('../helpers/schemas/clinic')
const Timeslot = require('../helpers/schemas/timeslot.js')

// Variables
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://' + config.appointmentUser.name + ':' + config.appointmentUser.password + '@cluster0.lj881zv.mongodb.net/?retryWrites=true&w=majority';
//const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/UserDB';

// MQTT Client
const mqttClient = new mqttHandler(config.appointmentUser.handler)
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
mqttClient.subscribeTopic('test')

// When a message arrives, respond to it or propagate it further
mqttClient.mqttClient.on('message', function (topic, message) {
    console.log(config.appointmentUser.handler + " service received MQTT message")
    console.log(message.toString());

    switch (topic) {
        case 'test':
            const newClinic = new Timeslot({});
            newClinic.save();
            mqttClient.sendMessage('testAppointment', JSON.stringify(newClinic))
            break;
        case 'bookAppointment':
            bookAppointment(message)
            break;
        case 'schema':
            mqttClient.sendMessage('testAppointment', "newClinic")
    }
});

function bookAppointment(input) {
    // mongodb manipulation


    //mqtt message response
}

module.exports = mqttClient;