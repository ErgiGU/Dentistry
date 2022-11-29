const mongoose = require('mongoose');
const mqttHandler = require('../helpers/mqtt_handler');
const config = require('../helpers/config');
const {appointments_mailer} = require("./controllers/appointments_mailer");

// Variables
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://' + config.appointmentUser.name + ':' + config.appointmentUser.password + '@cluster0.lj881zv.mongodb.net/?retryWrites=true&w=majority';
//const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/UserDB';

// MQTT Client
const mailer = new appointments_mailer
const mqttClient = new mqttHandler(config.appointmentUser.handler)
mqttClient.connect()

// Connect to MongoDB
const mongooseClient = mongoose.createConnection(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true}, function (err) {
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
})

// Model creation
const timeSlotModel = mongooseClient.model('timeslot', timeslotSchema)

// MQTT subscriptions
mqttClient.subscribeTopic('test')
mqttClient.subscribeTopic('appointment')

// When a message arrives, respond to it or propagate it further
mqttClient.mqttClient.on('message', function (topic, message) {
    let intermediary = JSON.parse(message)
    console.log(config.appointmentUser.handler + " service received MQTT message")
    console.log(intermediary)

    switch (topic) {
        case 'test':
            testAppointment(message)
            break;
        case 'schema':
            mqttClient.sendMessage('testAppointment', "newClinic")
            break;
        case 'appointment':
            testAppointment(intermediary)
            break;
        default:
            console.log('topic: ' + topic)
            console.log('message: ' + message)
            break;
    }
});

// Function declaration
/**
 * Test function extracted from topic switcher
 * @param message MQTT message
 */
function testAppointment(message) {
    const newClinic = new timeSlotModel({
        startTime: Date.parse(message.body.startTime),
        dentist: "6386284314d29ecf98a61c70"
    });
    newClinic.save(function (err) {
        if (err) {
            console.log(err);
        }
        console.log('successfully saved')
    });
    mqttClient.sendMessage(message.id + '/appointmentResponse', JSON.stringify(newClinic))
}

function bookAppointment(input) {
    // mongodb manipulation
    mailer.sendAppointmentMail(input.recipient, input.timeslot, input.clinic)
    mqttClient.sendMessage('bookAppointment', 'ADD MESSAGE HERE') //TODO: Add a message here.
    //mqtt message response
}

module.exports = mqttClient;