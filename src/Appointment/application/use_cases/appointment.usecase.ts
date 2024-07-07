import { AppointmentAttributes } from "otz-types";
import { AppointmentController } from "../../adapters/controllers/appointmentController";
import { AppointmentRepository } from "../../adapters/repositories/appointmentRepository";
import { AppointmentInteractor } from "../interactors/appointment/appointmentInteractor";

 async function createAppointment(data: AppointmentAttributes){
    const repository = new AppointmentRepository()
    const interactor = new AppointmentInteractor(repository)
    
    return await interactor.createAppointment(data)
}

export {createAppointment}