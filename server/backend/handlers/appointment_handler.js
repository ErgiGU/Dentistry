const config = require('../../helpers/config');
const express = require("express");
const mqttHandler = require('../../helpers/mqtt_handler');
const router = express.Router();

/**
 * Backend handler responsible for appointments.
 * Converts HTTP requests to published MQTT messages, and handles relevant subscriptions.
 */
// Initialisation
const mqttClient = new mqttHandler(config.appointmentUser.handler)
mqttClient.connect()

// Subscriptions
mqttClient.subscribeTopic('testAppointment')

// When a message arrives, handle response
mqttClient.mqttClient.on('message', function (topic, message) {
    console.log("Appointments handler received MQTT message")
    console.log(message.toString());
});

// Routes
router.get('/api/' + config.version + '/test', function (req, res) {
    mqttClient.sendMessage(req.body.topic, req.body.message);
    res.status(200).json({"mqtt": "sent"});
});

router.post('/api/' + config.version + '/test', function (req, res) {
    mqttClient.sendMessage(req.body.topic, req.body.message);
    console.log("Backend received POST and forwarded")
    res.status(200).json({"mqtt": "sent"});
});

module.exports = router;