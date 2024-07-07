import { EachMessagePayload } from "kafkajs";
import { kafka } from "../../config/kafka.config";

const consumer = kafka.consumer({ groupId: "appointment-group" });

// consumer topics
const consumeMessages = async ( topic: string, handleMessage:(message: EachMessagePayload)=>void ) => {
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      handleMessage({
        topic, partition, message,
        heartbeat: function (): Promise<void> {
          throw new Error("Function not implemented.");
        },
        pause: function (): () => void {
          throw new Error("Function not implemented.");
        }
      });
    },
  });
};

export { consumeMessages };
