const mqtt = require('mqtt');
const login = require('./loginController');

class MqttHandler {
    constructor() {
        this.mqttClient = null;
        this.host = 'http://localhost:1883';
        this.username = 'YOUR_USER'; // mqtt credentials if these are needed to connect
        this.password = 'YOUR_PASSWORD';
        this.subscribeTopic = 'request/login';
        this.publishTopic = 'response/login';
    }

    connect() {
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
        this.mqttClient = mqtt.connect(this.host, { username: this.username, password: this.password });

        // Mqtt error calback
        this.mqttClient.on('error', (err) => {
            console.log(err);
            this.mqttClient.end();
        });

        // Connection callback
        this.mqttClient.on('connect', () => {
            console.log(`Mqtt Client connected, Subscribed to ${this.subscribeTopic}`);
        });

        // mqtt subscriptions
        this.mqttClient.subscribe(this.subscribeTopic, {qos: 1});

        // When a message arrives, console.log it
        this.mqttClient.on('message', function (topic, message) {
            const response = login(message);
            this.sendMessage(response);
        });

    }

    // Sends a mqtt message to topic: mytopic
    sendMessage(message) {
        this.mqttClient.publish(this.publishTopic, message);
    }
}


module.exports = MqttHandler;