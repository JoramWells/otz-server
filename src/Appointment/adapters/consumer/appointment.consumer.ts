import { AppointmentAttributes } from "otz-types";
import { createAppointment, markAppointmentAsCompleted } from "../../application/use_cases/appointment.usecase";
import { consumeMessages, createConsumer } from "../repositories/kafkaConsumerAdapter";
import { EachMessagePayload } from "kafkajs";

async function handleMessage ({message}: EachMessagePayload){

    try {
      if (message.value) {
        const data = JSON.parse(message.value.toString());
        return await createAppointment(data);
      }
    } catch (error) {
      console.log(error)
    }

}

async function completeAppointment({message}: EachMessagePayload){
  try {
    if(message.value){
      const data = JSON.parse(message.value.toString())
      return await markAppointmentAsCompleted(data)

    }
  } catch (error) {
    console.log(error)
  }
}

const startAppointmentConsumer = async ()=>{
    console.log('appointment consumer started...')
    // await consumeMessages("appointment", handleMessage);
    await createConsumer('appointment-group',"appointment", handleMessage);
    // await consumeMessages('complete-appointment-topic', completeAppointment)

}

const startCompleteAppointmentConsumer = async () => {
  console.log("appointment consumer started...");
  await createConsumer('completed-group', 'complete', completeAppointment)
  // await consumeMessages("appointment-topic", handleMessage);
  // await consumeMessages("complete", completeAppointment);
};

export {startAppointmentConsumer, startCompleteAppointmentConsumer}

