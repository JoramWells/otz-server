import { AppointmentAttributes } from "otz-types";
import { AppointmentRepository } from "../../adapters/repositories/appointmentRepository";
import { AppointmentInteractor } from "../interactors/appointment/appointmentInteractor";

async function createAppointment(data: AppointmentAttributes) {
  const { patientID, agenda } = data as any;

  const repository = new AppointmentRepository();
  const interactor = new AppointmentInteractor(repository);

  return await Promise.all([
    interactor.getRecentAppointmentByPatientID(patientID, agenda as string),
    interactor.createAppointment(data),
  ]);
}


async function markAppointmentAsCompleted(data: AppointmentAttributes) {
  const { patientID, agenda } = data as any;
  const repository = new AppointmentRepository();
  const interactor = new AppointmentInteractor(repository);
  return await interactor.getRecentAppointmentByPatientID(
    patientID,
    agenda as string
  );
}

export { createAppointment, markAppointmentAsCompleted };
