import { AppointmentStatusAttributes } from "otz-types";

export interface IAppointmentStatusRepository {
  create: (data: AppointmentStatusAttributes ) => Promise<AppointmentStatusAttributes>;
  find: () => Promise<AppointmentStatusAttributes[]>;
  findById: (id: string) => Promise<AppointmentStatusAttributes | null>;
}
