const mqtt = require('mqtt')
const login = require('./loginController')

class MqttHandler {
  constructor() {
    this.mqttClient = null
    this.host = 'http://localhost:1883'
    this.username = 'YOUR_USER' // mqtt credentials if these are needed to connect
    this.password = 'YOUR_PASSWORD'
    this.subscribeTopic = 'request/login/+'
  }

  connect() {
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    try {
      this.mqttClient = mqtt.connect(this.host, {
        username: this.username,
        password: this.password
      })
    } catch (error) {
      console.log(error)
    }

    const localMqttClient = this.mqttClient

    // Mqtt error calback
    this.mqttClient.on('error', (err) => {
      console.log(err)
      this.mqttClient.end()
    })

    // Connection callback
    this.mqttClient.on('connect', () => {
      console.log(
        `Mqtt Client connected, Subscribed to '${this.subscribeTopic}'`
      )
    })

    // Subscribe the 'request/login' to receive login requests from dentists
    this.mqttClient.subscribe(this.subscribeTopic, { qos: 1 })

    // When a message arrives, console.log it
    this.mqttClient.on('message', async function (topic, message) {
      //-------------------------------------------------------------------\\
      const id = topic.split('/')[2] //  get id from the topic
      //--------------------------------------------------------------------\\

      const response = await login(JSON.parse(message.toString()))
      localMqttClient.publish(`response/login/${id}`, JSON.stringify(response))
    })
  }
}

module.exports = MqttHandler
