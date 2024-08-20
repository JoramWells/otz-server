import {Kafka} from 'kafkajs'

const kafka = new Kafka({
  clientId: "pharmacy",
  brokers: [process.env.KAFKA_BROKER || "kafka:29092"],
});

export { kafka }