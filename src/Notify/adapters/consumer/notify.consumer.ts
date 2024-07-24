
import { EachMessagePayload } from "kafkajs";
import { createNotification } from "../usecases/notification.usecase";
import { createConsumer } from "../repositories/kafkaConsumerAdapter";

async function handleMessage({ message }: EachMessagePayload) {
  try {
    if (message.value) {
      const data = JSON.parse(message.value.toString());
      return await createNotification(data);
    }
  } catch (error) {
    console.log(error);
  }
}


const startRefillConsumer = async () => {
  console.log("appointment consumer started...");
  // await consumeMessages("appointment", handleMessage);
  await createConsumer("notify-group", "refill", handleMessage);
  // await consumeMessages('complete-appointment-topic', completeAppointment)
};



export { startRefillConsumer,  };
