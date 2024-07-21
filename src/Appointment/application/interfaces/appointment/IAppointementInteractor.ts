import { AppointmentAttributes } from "otz-types";

export interface IAppointmentInteractor {
  createAppointment: (
    data: AppointmentAttributes
  ) => Promise<AppointmentAttributes>;
  getAllAppointments: () => Promise<AppointmentAttributes[]>;
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
  rescheduleAppointment: (id: string, reason: string, rescheduledDate: string) => Promise<boolean | null>;

  // 
  getRecentAppointmentByPatientID:(id: string, agenda: string)=>Promise<AppointmentAttributes | null>
}
