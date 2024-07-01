import { AppointmentStatusAttributes } from "otz-types";

export interface IAppointmentStatusInteractor {
  createAppointmentStatus: (data: AppointmentStatusAttributes) => Promise<AppointmentStatusAttributes>;
  getAllAppointmentStatus: () => Promise<AppointmentStatusAttributes[]>;
  getAppointmentStatusById: (id: string) => Promise<AppointmentStatusAttributes | null>;
}
