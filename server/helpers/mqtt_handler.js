const mqtt = require('mqtt');
const config = require('./config');

class MqttHandler {
    constructor(clientId) {
        this.mqttClient = null;
        this.host = config.host;
        this.clientId = clientId;
    }

    connect() {
        // Connect mqtt with credentials
        this.mqttClient = mqtt.connect(this.host,
            {
                clientId: this.clientId,
                reconnectPeriod: 1000
            });

        // Mqtt error callback
        this.mqttClient.on('error', (err) => {
            console.log('Error on client' + this.clientId);
            console.log(err);
            this.mqttClient.end();
        });

        // Connection callback
        this.mqttClient.on('connect', () => {
            console.log(`mqtt client ${this.clientId} connected`);
        });

        this.mqttClient.on('close', () => {
            console.log(`mqtt client ${this.clientId} disconnected`);
        });
    }

    // Sends a mqtt message
    sendMessage(topic, message) {
        this.mqttClient.publish(topic, message);
    }

    subscribeTopic(topic) {
        this.mqttClient.subscribe(topic);
        console.log('subscribed to: ' + topic)
    }
}

module.exports = MqttHandler;