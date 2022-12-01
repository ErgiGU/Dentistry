const mongoose = require('mongoose');
const mqttHandler = require('../helpers/mqtt_handler');
const config = require('../helpers/config');
const clinicSchema = require('../helpers/schemas/clinic');

// Variables
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://' + config.clinicUser.name + ':' + config.clinicUser.password + '@cluster0.lj881zv.mongodb.net/?retryWrites=true&w=majority';
//const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ClinicDB';

// MQTT Client
const mqttClient = new mqttHandler(config.clinicUser.handler)
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
//const timeSlotModel = mongooseClient.model('timeslot', timeslotSchema)

// MQTT subscriptions
mqttClient.subscribeTopic('test')

const editProfile = async (req, res) => {
    const clinicModel = mongooseClient.model('clinic', clinicSchema);
    const {email} = req.body
    const clinic = await clinicModel.find({email})
    if (clinic) {
        clinic.name = req.body.name || clinic.name;
        clinic.owner = req.body.owner || clinic.owner;
        clinic.address = req.body.address || clinic.address;
        clinic.email = req.body.email || clinic.email;
        clinic.password = req.body.password || clinic.password;
        res.status(200).json({clinic});
    } else {
        res.status(404).json("Clinic not found");
    }

}

// When a message arrives, respond to it or propagate it further
mqttClient.mqttClient.on('message', function (topic, message) {
    console.log(config.clinicUser.handler + " service received MQTT message")
    console.log(message.toString());

    switch (topic) {
        case 'test':
            mqttClient.sendMessage('testAppointment', 'Testing callback')
            break;
        case 'editInfo':
            mqttClient.sendMessage('editInfo', editProfile(message))
    }
});

module.exports = mqttClient;