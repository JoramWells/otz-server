import { AppointmentAttributes } from "otz-types";
import { AppointmentResponseInterface } from "../../../domain/models/appointment/appointment.model";

export interface IAppointmentInteractor {
  createAppointment: (
    data: AppointmentAttributes
  ) => Promise<AppointmentAttributes>;
  getAllAppointments: (
    dateString: string,
    hospitalID: string,
    page: number,
    pageSize: number,
    searchQuery: string
  ) => Promise<AppointmentResponseInterface | null>;
  getAppointmentById: (id: string) => Promise<AppointmentAttributes | null>;
  getAppointmentDetail: (id: string) => Promise<AppointmentAttributes[] | null>;
  getPriorityAppointmentDetail: (
    id: string
  ) => Promise<AppointmentAttributes[] | null>;
  starAppointment: (
    id: string,
    patientID: string,
    status: boolean
  ) => Promise<string | null>;
  getAllPriorityAppointments: () => Promise<AppointmentAttributes[] | null>;
  markAsRead: (id: string) => Promise<boolean | null>;
  rescheduleAppointment: (
    id: string,
    reason: string,
    rescheduledDate: string
  ) => Promise<boolean | null>;

  //
  getRecentAppointmentByPatientID: (
    id: string,
    agenda: string
  ) => Promise<AppointmentAttributes | null>;
}
