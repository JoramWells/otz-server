const kafka = require('../../config/kafka.config');

class KafkaAdapter {
  constructor() {
    this.kafkaProducer = kafka.producer();
  }

  async connect() {
    try {
      await this.kafkaProducer.connect();
    } catch (error) {
      console.log('Error connecting to producer');
    }
  }

  async disconnect() {
    return this.kafkaProducer.disconnect();
  }

  async sendMessage(topic, messages) {
    await this.connect();
    if (!Array.isArray(messages)) {
      console.log('Expected array messages');
    }
    await this.kafkaProducer.send({ topic, messages });
    await this.disconnect();
  }
}

module.exports = KafkaAdapter;
