import { AppointmentAgendaAttributes } from "otz-types";

export interface IAppointmentAgendaRepository {
  create: (data: AppointmentAgendaAttributes) => Promise<AppointmentAgendaAttributes>;
  delete: (id: string) => Promise<number | null>;
  find: () => Promise<AppointmentAgendaAttributes[]>;
  findById: (id: string) => Promise<AppointmentAgendaAttributes | null>;
}
