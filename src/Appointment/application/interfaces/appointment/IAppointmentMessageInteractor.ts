import { AppointmentMessageAttributes } from "otz-types";

export interface IAppointmentMessageInteractor {
  createAppointmentMessages: (data: AppointmentMessageAttributes) => Promise<AppointmentMessageAttributes>;
  getAllAppointmentMessages: () => Promise<AppointmentMessageAttributes[]>;
  getAppointmentMessagesById: (id: string) => Promise<AppointmentMessageAttributes[] | null>;
}
