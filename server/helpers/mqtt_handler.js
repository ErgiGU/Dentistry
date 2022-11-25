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
                username: this.username,
                reconnectPeriod: 1000
            });

        // Mqtt error callback
        this.mqttClient.on('error', (err) => {
            console.log('Error on client' + this.username);
            console.log(err);
            this.mqttClient.end();
        });

        // Connection callback
        this.mqttClient.on('connect', () => {
            console.log(`mqtt client ${this.username} connected`);
        });

        this.mqttClient.on('close', () => {
            console.log(`mqtt client ${this.username} disconnected`);
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