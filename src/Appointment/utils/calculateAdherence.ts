import { AppointmentAttributes } from "otz-types";

function calculateNextOccurrence(appointmentDate: string, frequency: string) {
  const startDate = new Date(appointmentDate);
  let nextRefillDate;

  switch (frequency) {
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
      nextRefillDate.setDate(startDate.getDate() + 2);
      break;

    case "monthly":
      nextRefillDate = new Date(appointmentDate);
      nextRefillDate.setDate(startDate.getDate() + 1);
      break;
    default:
      throw new Error("Invalid Frequency");
  }
  return nextRefillDate;
}

async function createAppointment(data: AppointmentAttributes) {
  const { appointmentDate, frequency } = data;
  let nextRefillDate;
  if (appointmentDate) {
    nextRefillDate = appointmentDate;
  } else {
    nextRefillDate = calculateNextOccurrence(appointmentDate as string, frequency as string)
  }
}
