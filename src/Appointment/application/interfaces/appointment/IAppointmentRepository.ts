import { AppointmentAttributes } from "otz-types";

export interface IAppointmentRepository {
  create: (data: AppointmentAttributes) => Promise<AppointmentAttributes>;
  find: () => Promise<AppointmentAttributes[]>;
  findById: (id: string) => Promise<AppointmentAttributes | null>;
  findAllAppointmentById: (id: string) => Promise<AppointmentAttributes[] | null>;
  findPatientAppointmentByID:(id: string)=>Promise<AppointmentAttributes[] | null>;
  findPriorityAppointmentDetail:(id: string)=>Promise<AppointmentAttributes[] | null>;
  findAllPriorityAppointments:()=>Promise<AppointmentAttributes[] | null>;
}
