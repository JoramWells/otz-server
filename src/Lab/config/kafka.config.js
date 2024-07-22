const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'appointment',
  brokers: ['kafka:29092'],
});

module.exports = kafka;
