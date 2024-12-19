import { Message, Partitioners } from "kafkajs";
import { kafka } from "../../../config/kafka.config";

export class KafkaAdapter {
  private readonly kafkaProducer: any;
  constructor() {
    this.kafkaProducer = kafka.producer({
      createPartitioner: Partitioners.LegacyPartitioner,
      retry: {
        retries: 5,
      },
    });
  }
  async connect() {
    try {
      await this.kafkaProducer.connect();
    } catch (error) {
      console.log("Error connecting to producer");
    }
  }

  async disconnect() {
    return this.kafkaProducer.disconnect();
  }

  async sendMessage(topic: string, messages: Message[]) {
    try {
      await this.connect();
      if (!Array.isArray(messages)) {
        console.log("Expected array messages");
      }
      await this.kafkaProducer.send({ topic, messages });
    } catch (error) {
      console.error(error, "Error sending kafka messages!!");
    } finally {
      await this.disconnect();
    }
  }
}
