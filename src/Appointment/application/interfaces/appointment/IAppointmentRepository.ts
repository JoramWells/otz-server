import { AppointmentAttributes } from "otz-types";
import { AppointmentResponseInterface } from "../../../domain/models/appointment/appointment.model";

export interface IAppointmentRepository {
  create: (data: AppointmentAttributes) => Promise<AppointmentAttributes>;
  find: (
    dateQuery: string,
    hospitalID: string,
    page: number,
    pageSize: number,
    searchQuery: string
  ) => Promise<AppointmentResponseInterface | null>;
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
  reschedule: (
    id: string,
    reason: string,
    rescheduledDate: string
  ) => Promise<boolean | null>;

  //
  findRecentAppointmentByPatientID: (
    id: string,
    agenda: string
  ) => Promise<AppointmentAttributes | null>;
}
