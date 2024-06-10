import { Op } from "sequelize"
import { Appointment } from "../domain/models/appointment/appointment.model"
import { AppointmentStatus } from "../domain/models/appointment/appointmentStatus.model"
import { logger } from "./logger"
import moment from "moment"


export const markMissedAppointments = async() =>{
    const today = moment().format('YYYY-MM-DD')



    try {
          const appointmentStatus = await AppointmentStatus.findOne({
            where: {
              statusDescription: "Missed",
            },
          }); 

          console.log(appointmentStatus)

          if(appointmentStatus){
            const results = await Appointment.findAll({
              where: {
                appointmentDate: {
                  [Op.lt]: today,
                },
                appointmentStatusID: {
                  [Op.ne]: appointmentStatus.id,
                },
              },
            });
            if(results){
              for(const appointment of results){
                // console.log(appointment)
                await appointment.update(
                  {appointmentStatusID: appointmentStatus.id},
                  {where:{
                    id:appointment.id
                  } }            
                )
                // 
               logger.info({
                message: `Appointments modified for ${appointment.id} `,
              });

              }
            }
          }
   
    } catch (error) {
        logger.error({error})
    }
}