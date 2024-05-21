import { Op } from "sequelize"
import { Appointment } from "../domain/models/appointment/appointment.model"

export const markMissedAppointments = async() =>{
    const today = new Date()
    today.setHours(0,0,0,0)

    try {
        await Appointment.update(
          { appointmentStatusID: "c81ea8d9-aa34-4a47-95f4-7bd8bb637523" },
          {
            where: {
              appointmentDate: {
                [Op.lt]: today,
              },
            },
          }
        );
    } catch (error) {
        
    }
}