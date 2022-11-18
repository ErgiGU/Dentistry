const config = require('../../helpers/config');
const express = require("express");
const mqttHandler = require('../../helpers/mqtt_handler');
const router = express.Router();

/**
 * Backend handler responsible for clinic data.
 * Converts HTTP requests to published MQTT messages, and handles relevant subscriptions.
 */
// Initialisation
const mqttClient = new mqttHandler(config.clinicUser.handler)
mqttClient.connect()

// Subscriptions


// Routes




module.exports = router;