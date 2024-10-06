import {
  compensateFrequencyChangeUseCase,
  createAppointment,
  markAppointmentAsCompleted,
} from "../../application/use_cases/appointment.usecase";
import { createAppointmentOccurrence } from "../../utils/calculateNextOccurrence";
import { logger } from "../../utils/logger";
import {
  consumeMessages,
  createConsumer,
} from "../repositories/kafkaConsumerAdapter";
import { EachMessagePayload } from "kafkajs";

async function handleMessage({ message }: EachMessagePayload) {
  try {
    if (message.value) {
      const data = JSON.parse(message.value.toString());
      // const {appointmentDate, frequency} = data
      const nextAppointment = await createAppointmentOccurrence(data);
      console.log({ ...data, nextAppointment }, "Data at consumer!!");

      // return await Promise.all([
      // markAppointmentAsCompleted(completeInputs as any),
      await createAppointment({ ...data, appointmentDate: nextAppointment });
      // ])
    }
  } catch (error) {
    logger.error(error);
    console.log(error);
  }
}

async function completeAppointment({ message }: EachMessagePayload) {
  try {
    if (message.value) {
      const data = JSON.parse(message.value.toString());
      return await markAppointmentAsCompleted(data);
    }
  } catch (error) {
    logger.error(error);

    console.log(error);
  }
}

async function compensateFrequencyChange({ message }: EachMessagePayload) {
  try {
    if (message.value) {
      const data = JSON.parse(message.value.toString());
      return await compensateFrequencyChangeUseCase(data);
    }
  } catch (error) {
    console.error(error);
  }
}

const startAppointmentConsumer = async () => {
  console.log("appointment consumer started2...");

  await Promise.all([
    // await consumeMessages("create", compensateFrequencyChange),
    // consumeMessages("complete", completeAppointment),
    createConsumer("create-group", "create", handleMessage),
    createConsumer('create-group', 'frequency', handleMessage)
    // createConsumer("complete-group", "complete", completeAppointment)
    // await createConsumer(
    //   "appointment-group",
    //   "create",
    //   compensateFrequencyChange
    // );
  ]);
};

const startCompleteAppointmentConsumer = async () => {
  console.log("appointment consumer started...");
  await createConsumer("appointment-group", "complete", completeAppointment);
  // await createConsumer(
  //   "appointment-group",
  //   "create",
  //   compensateFrequencyChange
  // );

  // await consumeMessages("appointment-topic", handleMessage);
  // await consumeMessages("complete", completeAppointment);
};

export { startAppointmentConsumer, startCompleteAppointmentConsumer };
