import {Kafka} from 'kafkajs'

const kafka = new Kafka({
  clientId: "appointment",
  brokers: [process.env.KAFKA_BROKER || "kafka:29092"],
});

export { kafka }