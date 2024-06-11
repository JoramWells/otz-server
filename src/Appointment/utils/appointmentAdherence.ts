import { Op } from "sequelize"
import { Appointment } from "../domain/models/appointment/appointment.model"
import { AppointmentEntity } from "../domain/entities/AppointmentEntity"
import { AppointmentStatus } from "../domain/models/appointment/appointmentStatus.model"
import { AppointmentStatusEntity } from "../domain/entities/AppointmentStatusEntity"

const calculateAppointmentAdherence = async()=>{
try {
        const appointmentStatusData: AppointmentStatusEntity =
          await AppointmentStatus.findOne({
            where: {
              appointmentStatus: "Missed",
            },
          });
        const appointments: AppointmentEntity[] = await Appointment.findAll({
          where: {
            createdAt: {
              [Op.not]: null,
            },
            patientID: {
              [Op.not]: null,
            },
          },
        });

        const adherenceByPatient: {
          [patientID: string]: { completed: number; totalAppointments: number };
        } = {};
        appointments.forEach((appointment) => {
          if (!adherenceByPatient[appointment.patientID]) {
            adherenceByPatient[appointment.patientID] = {
              completed: 0,
              totalAppointments: 0,
            };
          }

          adherenceByPatient[appointment.patientID].totalAppointments += 1;

          if (appointment.appointmentStatusID !== appointmentStatusData.id) {
            adherenceByPatient[appointment.patientID].completed += 1;
          }
        });

        for (const patientID in adherenceByPatient) {
          const patientAdherence = adherenceByPatient[patientID];
          const adherenceRate =
            (patientAdherence.completed / patientAdherence.totalAppointments) *
            100;

            return adherenceRate
        }
} catch (error) {
    console.log(error)
}
}

export {calculateAppointmentAdherence}