import { AppointmentAttributes } from "otz-types";
import { AppointmentStatus } from "../domain/models/appointment/appointmentStatus.model";
import { AppointmentAgenda } from "../domain/models/appointment/appointmentAgenda.model";
import { Appointment } from "../domain/models/appointment/appointment.model";
import { Op } from "sequelize";

export async function markAsCompletedAppointment(
  id: string,
  agenda: string
): Promise<AppointmentAttributes | null> {
  // if ((await this.redisClient.get(id)) === null) {

  const currentDate = new Date();

  const appointmentStatus = await AppointmentStatus.findOne({
    where: {
      statusDescription: "Completed",
    },
  });

  const appointmentAgenda = await AppointmentAgenda.findOne({
    where: {
      agendaDescription: agenda,
    },
  });

  if (appointmentStatus && appointmentAgenda) {
    const results = await Appointment.findOne({
      order: [["createdAt", "DESC"]],
      where: {
        patientID: id,
        appointmentAgendaID: appointmentAgenda.id,
        //   createdAt: {
        //     [Op.not]: currentDate,
        //   },
      } as any,
      logging: console.log,
    });

    // if (results) {
      // console.log(results, "apx");

    //   results.appointmentStatusID = appointmentStatus.id;
      await results?.update(
        { appointmentStatusID: appointmentStatus.id },
        { logging: console.log }
      );
    // }

    return results;
  }

  // await this.redisClient.set(id, JSON.stringify(results));

  return null;
  // }

  // const cachedData: string | null = await this.redisClient.get(id);
  // if (cachedData === null) {
  //   return null;
  // }
  // const results: AppointmentAttributes[] = JSON.parse(cachedData);
  // console.log("fetched appointment from cace!");

  // return results;
}
