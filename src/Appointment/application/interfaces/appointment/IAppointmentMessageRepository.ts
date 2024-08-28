import { AppointmentMessageAttributes } from "otz-types";

export interface IAppointmentMessageRepository {
  create: (data: AppointmentMessageAttributes) => Promise<AppointmentMessageAttributes>;
  find: () => Promise<AppointmentMessageAttributes[]>;
  findById: (id: string) => Promise<AppointmentMessageAttributes[] | null>;
}
