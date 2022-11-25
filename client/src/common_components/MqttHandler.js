const mqtt = require('mqtt');
const url = 'ws://localhost:1884'

function getClient(errorHandler) {
    const client = mqtt.connect(url,
        {
            clientId: `webclient_ + ${Math.random().toString(16).slice(2, 8)}`,
            reconnectPeriod: 1000
        });

    // Mqtt error callback
    client.on('error', (err) => {
        console.log('Error on client' + this.username);
        console.log(err);
        client.end();
    });

    // Connection callback
    client.on('connect', () => {
        console.log(`mqtt client ${this.clientId} connected`);
    });

    client.on('close', () => {
        console.log(`mqtt client ${this.clientId} disconnected`);
    });

    return client;
}

// Sends a mqtt message
function sendMessage(topic, message) {
    this.mqttClient.publish(topic, message);
}

function subscribe(client, topic, errorHandler) {
    const callBack = (err, granted) => {
        if (err) {
            errorHandler("Subscription request failed");
        }
    };
    return client.subscribe(topic, callBack);
}

const MqttHandler = {
    getClient,
    subscribe,
}

export default MqttHandler;