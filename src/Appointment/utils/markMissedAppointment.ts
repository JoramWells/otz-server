import { Op } from "sequelize"
import { Appointment } from "../domain/models/appointment/appointment.model"
import { AppointmentStatus } from "../domain/models/appointment/appointmentStatus.model"
import { logger } from "./logger"
import moment from "moment"
import { scheduleJob } from "node-schedule"
import { UserAvailability } from "../domain/models/userAvailability.model"

function getDayName(dateStr:string){
  const daysOfWeek = ['Monday','Tuesday','Wednesday','Thursday', 'Friday', 'Saturday', 'Sunday']

  const date = new Date(dateStr)
  const dayName =  daysOfWeek[date.getDay()] 
  return dayName;
}

function findNextAvailableDate(currentDate: string, availableDays: string[]){
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const availableDaysIndex = availableDays.map(day=>daysOfWeek.indexOf(day))
  const nextDate = new Date(currentDate)

  while(!availableDaysIndex.includes(nextDate.getDay()+1)){
    nextDate.setDate(nextDate.getDate()+1)
  }


return nextDate;
}

export const rescheduleOnUnavailable = async()=>{

  const daysNotAvailable =await UserAvailability.findAll();
  // const {data} = daysNotAvailable
  // console.log(daysNotAvailable[0].dataValues)
  const daysObj = daysNotAvailable[0].dataValues.daysAvailable
  const unAvailableDays = []
  const availableDays = []
  for(const key in  daysObj){
    if(daysObj[key] === false){
      unAvailableDays.push(key)
    }else{
      availableDays.push(key)
    }
  }


  // missed
     const appointmentStatus = await AppointmentStatus.findOne({
       where: {
         statusDescription: "Missed",
       },
     }); 

  
  // get rescheduled appointment status
  const rescheduledStatus = await AppointmentStatus.findOne({
    where:{
      statusDescription:'Rescheduled'
    }
  })

  
  const reason = 'We are unavailable!!' 
if(rescheduledStatus && appointmentStatus){

  const appointments = await Appointment.findAll({
    where: {
      appointmentStatusID: {
        [Op.notIn]: [appointmentStatus.id],
      },
    },

  });
  if (appointments) {
    for(const appointment of appointments){
      if(appointment.appointmentDate){
        const dayName = getDayName(appointment.appointmentDate);
        const isPresent = unAvailableDays.find(day=>day=== dayName)
        if(isPresent){
           const rescheduledDate = findNextAvailableDate(appointment.appointmentDate, availableDays);
           console.log(rescheduledDate), "lopi");

          await appointment.update({
            appointmentStatusID:rescheduledStatus.id,
            rescheduledDate,
            rescheduledReason: reason
          },
        {where:{
          id:appointment.id
        }}
        )
        }

      }
    }
  }
}
}


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