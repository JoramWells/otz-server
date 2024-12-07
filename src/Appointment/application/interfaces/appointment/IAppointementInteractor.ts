import { AppointmentAttributes } from "otz-types";
import { AppointmentResponseInterface } from "../../../domain/models/appointment/appointment.model";
import { UniqueAppointmentInterface } from "../../../entities/UniqueAppointmentAgendaEntity";

export interface IAppointmentInteractor {
  createAppointment: (
    data: AppointmentAttributes
  ) => Promise<AppointmentAttributes>;
  getAllAppointments: (
    dateString: string,
    hospitalID: string,
    page?: number | string,
    pageSize?: number | string,
    searchQuery?: string,
    status?: string,
    agenda?: string
  ) => Promise<AppointmentResponseInterface | null | undefined>;
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
  getAllPriorityAppointments: (
    hospitalID: string
  ) => Promise<AppointmentAttributes[] | null | undefined>;
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

  //
  getUniqueAppointmentAgenda: (
    hospitalID: string,
    dateQuery: string
  ) => Promise<UniqueAppointmentInterface[] | null | undefined>;

  //
  getStarredPatientAppointments: (
    hospitalID?: string,
    page?: number | string,
    pageSize?: number | string,
    searchQuery?: string
  ) => Promise<AppointmentResponseInterface | null | undefined>;
}
