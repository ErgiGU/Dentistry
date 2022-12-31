const mqtt = require('mqtt');
const uuid = require('uuid')

function getClient(prevClient) {

    if (prevClient !== null) {
        return prevClient;
    }

    const client = mqtt.connect('ws://127.0.0.1:1884/mqtt',
        {
            clientId: 'webclient/' + uuid.v4({stringify: true}),
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
        console.log(`mqtt client ${client.options.clientId} connected`);
    });

    client.on('close', () => {
        console.log(`mqtt client ${client.options.clientId} disconnected`);
    });

    return client;
}

const MqttHandler = {
    getClient
}

export default MqttHandler;