import { Kafka, logLevel } from "kafkajs";

const kafka = new Kafka({
  clientId: "appointment",
  brokers: [process.env.KAFKA_BROKER || "kafka:9092" || "kafka:29092"],
  logLevel: logLevel.INFO,
});

export { kafka };
