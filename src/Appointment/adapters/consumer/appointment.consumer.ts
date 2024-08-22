import { createAppointment, markAppointmentAsCompleted } from "../../application/use_cases/appointment.usecase";
import { logger } from "../../utils/logger";
import {  consumeMessages, createConsumer } from "../repositories/kafkaConsumerAdapter";
import { EachMessagePayload } from "kafkajs";

async function handleMessage ({message}: EachMessagePayload){

    try {
      if (message.value) {
        const data = JSON.parse(message.value.toString());
        const {patientID} = data
        const agenda = 'Refill'
        const completeInputs={
          patientID,
          agenda
        }

        return await Promise.all([
            markAppointmentAsCompleted(completeInputs as any),
            createAppointment(data)
        ])


      }
    } catch (error) {
      logger.error(error)
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
      logger.error(error)

    console.log(error)
  }
}

const startAppointmentConsumer = async ()=>{
    console.log('appointment consumer started...')

    await Promise.all([
      // consumeMessages("create", handleMessage),
      // consumeMessages("complete", completeAppointment),
      createConsumer('create-group',"create", handleMessage),
      // createConsumer("complete-group", "complete", completeAppointment)
    ]);



}

const startCompleteAppointmentConsumer = async () => {
  console.log("appointment consumer started...");
  await createConsumer("appointment-group", "complete", completeAppointment);
  // await consumeMessages("appointment-topic", handleMessage);
  // await consumeMessages("complete", completeAppointment);
};

export {startAppointmentConsumer, startCompleteAppointmentConsumer}

