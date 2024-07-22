import { AppointmentAttributes } from "otz-types";
import { AppointmentRepository } from "../../adapters/repositories/appointmentRepository";
import { AppointmentInteractor } from "../interactors/appointment/appointmentInteractor";

 async function createAppointment(data: AppointmentAttributes){
    const repository = new AppointmentRepository()
    const interactor = new AppointmentInteractor(repository)
    console.log('Creating appointments in use case...')
    
    return await interactor.createAppointment(data)
}

async function markAppointmentAsCompleted(data: AppointmentAttributes){
    const {patientID, agenda} = data
    const repository = new AppointmentRepository()
    const interactor = new AppointmentInteractor(repository)
    return await interactor.getRecentAppointmentByPatientID(patientID, agenda as string)
}

export {createAppointment, markAppointmentAsCompleted}