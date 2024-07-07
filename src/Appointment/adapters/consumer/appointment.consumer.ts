import { AppointmentAttributes } from "otz-types";
import { createAppointment } from "../../application/use_cases/appointment.usecase";
import { consumeMessages } from "../repositories/kafkaConsumerAdapter";
import { EachMessagePayload } from "kafkajs";

async function handleMessage ({message}: EachMessagePayload){

    if(message.value){
        const data = JSON.parse(message.value.toString());
        return await createAppointment(data);
    }

   

}

const startAppointmentConsumer = async ()=>{
    console.log('appointment consumer started...')
    await consumeMessages("appointment-topic", handleMessage);

}

export {startAppointmentConsumer}

