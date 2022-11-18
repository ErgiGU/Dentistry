const config = require('../../helpers/config');
const express = require("express");
const mqttHandler = require('../../helpers/mqtt_handler');
const router = express.Router();

/**
 * Backend handler responsible for authorization.
 * Converts HTTP requests to published MQTT messages, and handles relevant subscriptions.
 */
// Initialisation
const mqttClient = new mqttHandler(config.authorizationUser.handler)
mqttClient.connect()

// Subscriptions
mqttClient.subscribeTopic('authTest')

// When a message arrives, handle response
mqttClient.mqttClient.on('message', function (topic, message) {
    console.log("Authorization handler received MQTT message")
    console.log(message.toString());
});

// Routes
router.post('/api/' + config.version + '/auth', function (req, res) {
    // topic: auth, message: true
    mqttClient.sendMessage(req.body.topic, req.body.message);
    res.status(200).json({"mqtt": "sent"});
});

module.exports = router;