import { AppointmentAttributes } from "otz-types";

export interface IAppointmentInteractor {
  createAppointment: (data: AppointmentAttributes) => Promise<AppointmentAttributes>;
  getAllAppointments: () => Promise<AppointmentAttributes[]>;
  getAppointmentById: (id: string) => Promise<AppointmentAttributes | null>;
  getAppointmentDetail: (id: string) => Promise<AppointmentAttributes[] | null>;
  getPriorityAppointmentDetail: (id: string) => Promise<AppointmentAttributes[] | null>;
  getAllPriorityAppointments: () => Promise<AppointmentAttributes[] | null>;
}
