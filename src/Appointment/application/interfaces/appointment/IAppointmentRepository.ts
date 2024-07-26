import { AppointmentAttributes } from "otz-types";

export interface IAppointmentRepository {
  create: (data: AppointmentAttributes) => Promise<AppointmentAttributes>;
  find: (dateQuery:string) => Promise<AppointmentAttributes[]>;
  findById: (id: string) => Promise<AppointmentAttributes | null>;
  findAllAppointmentById: (
    id: string
  ) => Promise<AppointmentAttributes[] | null>;
  findPatientAppointmentByID: (
    id: string
  ) => Promise<AppointmentAttributes[] | null>;
  findPriorityAppointmentDetail: (
    id: string
  ) => Promise<AppointmentAttributes[] | null>;
  findAllPriorityAppointments: () => Promise<AppointmentAttributes[] | null>;
  markAsStarred: (
    id: string,
    patientID: string,
    status: boolean
  ) => Promise<string | null>;
  markAsRead: (id: string) => Promise<boolean | null>;
  reschedule: (id: string, reason: string, rescheduledDate: string) => Promise<boolean | null>;

  // 
  findRecentAppointmentByPatientID:(id: string, agenda: string)=>Promise<AppointmentAttributes | null>

}
