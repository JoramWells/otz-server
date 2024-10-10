import { AppointmentAttributes } from "otz-types";
import { AppointmentRepository } from "../../adapters/repositories/appointmentRepository";
import { AppointmentInteractor } from "../interactors/appointment/appointmentInteractor";
import { Appointment } from "../../domain/models/appointment/appointment.model";

async function createAppointment(data: AppointmentAttributes) {
  const { patientID, agenda } = data as any;

  const repository = new AppointmentRepository();
  const interactor = new AppointmentInteractor(repository);

  return await Promise.all([
    interactor.getRecentAppointmentByPatientID(patientID, agenda as string),
    interactor.createAppointment(data),
  ]);
}

async function compensateFrequencyChangeUseCase(data: AppointmentAttributes) {
  try {
    const {  patientVisitID, appointmentDate } = data;
    // const appointmentResults = await AppointmentAgenda.findOne({
    //   where: {
    //     agendaDescription: agenda,
    //   },
    // });

    // if (appointmentResults) {
      const results = await Appointment.findOne({
        where: {
          patientVisitID,
        },
      });
      if (results) {
        // results.appointmentAgendaID = appointmentResults.id;
        results.appointmentDate = appointmentDate;
        results.save();
      }
    // }
  } catch (error) {
    console.log(error);
  }
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

export {
  createAppointment,
  markAppointmentAsCompleted,
  compensateFrequencyChangeUseCase,
};
