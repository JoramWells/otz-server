import { Op } from "sequelize"
import { Appointment } from "../domain/models/appointment/appointment.model"
import { AppointmentStatus } from "../domain/models/appointment/appointmentStatus.model"
import { logger } from "./logger"
import moment from "moment"
import { scheduleJob } from "node-schedule"


export const markMissedAppointments = async() =>{
    const today = moment().format('YYYY-MM-DD')



    try {
          const appointmentStatus = await AppointmentStatus.findOne({
            where: {
              statusDescription: "Missed",
            },
          }); 

             const upcomingAppointmentStatus = await AppointmentStatus.findOne({
               where: {
                 statusDescription: "Upcoming",
               },
             }); 

          const pendingStatusAppointments = await AppointmentStatus.findOne({
            where:{
              statusDescription:'Pending'
            }
          })

          // mark today appointment as pending
          if(pendingStatusAppointments && appointmentStatus){
            const todaysAppointment = await Appointment.findAll({
              where:{
                // appointmentDate: today,
                appointmentStatusID:{[Op.ne]: appointmentStatus.id}
              }
            })
            if(todaysAppointment){
              for(const appointment of todaysAppointment){

                const date = moment(`${appointment.appointmentDate} ${appointment.appointmentTime}`, 'YYYY-MM-DD HH:mm')
                


                scheduleJob(date.format(), async()=>{
                await appointment.update(
                  { appointmentStatusID: pendingStatusAppointments.id },
                  {
                    where: {
                      id: appointment.id,
                    },
                  }
                );
                logger.info({
                  message: `Changed ${appointment.id} to pending...`,
                });
                })


              }

            }
          }


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
                
                const date = moment(
                  `${appointment.appointmentDate} ${appointment.appointmentTime}`,
                  "YYYY-MM-DD HH:mm"
                );

                console.log(date.format(), "date", appointment.appointmentDate);


                // 
                // scheduleJob(date.format(), async ()=>{
                  await appointment.update(
                    { appointmentStatusID: appointmentStatus.id },
                    {
                      where: {
                        id: appointment.id,
                      },
                    }
                  );
                  //
                  logger.info({
                    message: `Appointments modified for ${appointment.id} `,
                  });
                // })
    
       

              }
            }
          }
   
    } catch (error) {
        logger.error({error})
    }
}