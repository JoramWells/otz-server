import { Op } from "sequelize"
import { Appointment } from "../domain/models/appointment/appointment.model"
import { AppointmentStatus } from "../domain/models/appointment/appointmentStatus.model"
import { logger } from "./logger"

export const markMissedAppointments = async() =>{
    const today = new Date()
    today.setHours(0,0,0,0)



    try {
          const appointmentStatus = await AppointmentStatus.findOne({
            where: {
              statusDescription: "Missed",
            },
          }); 

          if(appointmentStatus){
            const updateResults = await Appointment.update(
              { appointmentStatusID: appointmentStatus.id },
              {
                where: {
                  appointmentDate: {
                    [Op.lt]: today,
                  },
                },
              }
            );

            if(updateResults){
              logger.info({
                message: "Appointments successfully changed to Missed",
              });
            }
            
          }
          else{
            logger.error({message:'No appointment agenda with missed status'})
          }
   
    } catch (error) {
        logger.error({error})
    }
}