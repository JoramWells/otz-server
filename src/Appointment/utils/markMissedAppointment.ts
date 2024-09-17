import { Op } from "sequelize";
import { Appointment } from "../domain/models/appointment/appointment.model";
import { AppointmentStatus } from "../domain/models/appointment/appointmentStatus.model";
import { logger } from "./logger";
import moment from "moment";
import { scheduleJob } from "node-schedule";
import { UserAvailability } from "../domain/models/userAvailability.model";

interface WeekDays {
  [key: string]: boolean; // Allow indexing with string keys
  Monday: boolean;
  Tuesday: boolean;
  Wednesday: boolean;
  Thursday: boolean;
  Friday: boolean;
  Saturday: boolean;
  Sunday: boolean;
}

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

function getDayName(dateStr: string) {

  const date = new Date(dateStr);
  const dayName = daysOfWeek[date.getDay()];
  return dayName;
}



function findNextAvailableDate(currentDate: string, availableDays: string[]) {

  const availableDaysIndex = availableDays.map((day) =>
    daysOfWeek.indexOf(day)
  );
  const nextDate = new Date(currentDate);

  while (!availableDaysIndex.includes(nextDate.getDay() + 1)) {
    nextDate.setDate(nextDate.getDate() + 1);
  }

  return nextDate;
}

function getDayNumber(dayName: string){
  return daysOfWeek.indexOf(dayName)
}

const findNextAvailableDateWithTime = (currentDate: Date, availability:Array<{day: string, startTime: string, endTime:string}>) =>{
  const now = new Date(currentDate)
  const currentDay = now.getDay()
  const currentTime = now.getHours() * 60 + now.getMinutes()

  // 
  for(let i =0; i < 7; i++){
    const dayIndex = (currentDay + i) % 7
    const dayAvailability = availability.find(day=>dayIndex === getDayNumber(day.day))

    // 
    if(dayAvailability){
      const [startHours, startMinutes] = dayAvailability.startTime.split(':').map(Number)
      const [endHours, endMinutes] = dayAvailability.endTime.split(':').map(Number)
      const startTimeInMinutes = startHours * 60 + startMinutes

      // 
      if(i === 0 && currentTime < startTimeInMinutes){
        return new Date(now.setHours(startHours, startMinutes, 0, 0))
      } else if (i !== 0){
        const nextAvailableDate = new Date(now)
        nextAvailableDate.setDate(now.getDate() + i)
        nextAvailableDate.setHours(startHours, startMinutes, 0, 0)
        return nextAvailableDate
      }
    }
  }
  return null
}

export const rescheduleOnUnavailable = async () => {
  const userAvailability = await UserAvailability.findAll();
  const availableDaySet = new Set<string>();
  const unavailableDaySet = new Set<string>();

  //
  userAvailability.forEach((availabilityRecord) => {
    const { availability } = availabilityRecord.dataValues;
    availability?.forEach(
      (dayAvailability: {
        available: boolean;
        day: string;
        startTime: Date;
        endTime: Date;
      }) => {
        if (dayAvailability.available) {
          availableDaySet.add(dayAvailability.day);
        } else {
          unavailableDaySet.add(dayAvailability.day);
        }
      }
    );
  });

  //
  const availableDays = Array.from(availableDaySet);
  const unAvailableDays = Array.from(unavailableDaySet);

  // missed
  const appointmentStatus = await AppointmentStatus.findOne({
    where: {
      statusDescription: "Missed",
    },
  });

  // get rescheduled appointment status
  const rescheduledStatus = await AppointmentStatus.findOne({
    where: {
      statusDescription: "Rescheduled",
    },
  });

  const reason = "We are unavailable!!";
  if (rescheduledStatus && appointmentStatus) {
    const appointments = await Appointment.findAll({
      where: {
        appointmentStatusID: {
          [Op.notIn]: [appointmentStatus.id],
        },
      },
    });
    if (appointments) {
      for (const appointment of appointments) {
        if (appointment.appointmentDate) {
          const dayName = getDayName(appointment.appointmentDate);
          const isUnavailable = unAvailableDays.includes(dayName);
          if (isUnavailable) {
            const rescheduledDate = findNextAvailableDate(
              appointment.appointmentDate,
              availableDays
            );
            //  console.log(rescheduledDate), "lopi");

            await appointment.update(
              {
                appointmentStatusID: rescheduledStatus.id,
                rescheduledDate: rescheduledDate as unknown as string,
                rescheduledReason: reason,
              },
              {
                where: {
                  id: appointment.id,
                },
              }
            );
          }
        }
      }
    }
  }
};

export const markMissedAppointments = async () => {
  const today = moment().format("YYYY-MM-DD");

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
      where: {
        statusDescription: "Pending",
      },
    });

    // mark today appointment as pending
    if (pendingStatusAppointments && appointmentStatus) {
      const todaysAppointment = await Appointment.findAll({
        where: {
          // appointmentDate: today,
          appointmentStatusID: { [Op.ne]: appointmentStatus.id },
        },
      });
      if (todaysAppointment) {
        for (const appointment of todaysAppointment) {
          const date = moment(
            `${appointment.appointmentDate} ${appointment.appointmentTime}`,
            "YYYY-MM-DD HH:mm"
          );

          scheduleJob(date.format(), async () => {
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
          });
        }
      }
    }

    if (appointmentStatus) {
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
      if (results) {
        for (const appointment of results) {
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
    logger.error({ error });
  }
};
