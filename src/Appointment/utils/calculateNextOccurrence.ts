import moment from "moment";
import { AppointmentAttributes } from "otz-types";


function calculateNextOccurrence(appointmentDate: string | Date, frequency: string){
    const startDate = new Date(appointmentDate)
    let nextRefillDate;

    switch (frequency?.toLowerCase()) {
      case "daily":
        nextRefillDate = new Date(appointmentDate);
        nextRefillDate.setDate(startDate.getDate() + 1);
        break;

      case "weekly":
        nextRefillDate = new Date(appointmentDate);
        nextRefillDate.setDate(startDate.getDate() + 7);
        break;

      case "bimonthly":
        nextRefillDate = new Date(appointmentDate);
        nextRefillDate.setDate(startDate.getMonth() + 2);
        break;

      case "monthly":
        nextRefillDate = new Date(appointmentDate);
        nextRefillDate.setDate(startDate.getMonth() + 1);
        break;

      default:
         nextRefillDate = new Date(appointmentDate);

    }

    return nextRefillDate
}

async function createAppointmentOccurrence(data: AppointmentAttributes) {
  const { appointmentDate, frequency } = data;
  console.log(data)
  let nextRefillDate  = calculateNextOccurrence(new Date(appointmentDate!), frequency!)


  return nextRefillDate;
}

export {createAppointmentOccurrence}


