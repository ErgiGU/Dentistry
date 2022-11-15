const mqtt = require('mqtt');
const config = require('./config');

class MqttHandler {
    constructor(username) {
        this.mqttClient = null;
        this.host = config.host;
        this.username = username;
    }

    connect() {
        // Connect mqtt with credentials
        this.mqttClient = mqtt.connect(this.host,
            {
                username: this.username
            });

        this.mqttClient.reconnectPeriod = 1000;

        // Mqtt error callback
        this.mqttClient.on('error', (err) => {
            console.log(err);
            this.mqttClient.end();
        });

        // Connection callback
        this.mqttClient.on('connect', () => {
            console.log(`mqtt client connected`);
        });

        // MQTT subscriptions
        this.mqttClient.subscribe('mytopic', {qos: 0});

        // When a message arrives, console.log it
        this.mqttClient.on('message', function (topic, message) {
            console.log(message.toString());
        });

        this.mqttClient.on('close', () => {
            console.log(`mqtt client disconnected`);
        });
    }

    // Sends a mqtt message
    sendMessage(topic, message) {
        this.mqttClient.publish(topic, message);
    }

    subscribeTopic(topic) {
        this.mqttClient.subscribe(topic);
    }
}

module.exports = MqttHandler;