import { AppointmentAgendaAttributes } from "otz-types";

export interface IAppointmentAgendaInteractor {
  createAppointmentAgenda: (data: AppointmentAgendaAttributes) => Promise<AppointmentAgendaAttributes>;
  getAllAppointmentAgendas: () => Promise<AppointmentAgendaAttributes[]>;
  getAppointmentAgendaById: (id: string) => Promise<AppointmentAgendaAttributes | null>;
  deleteAppointmentAgenda: (id: string) => Promise<number | null>;
  markAsFavorite: (id: string) => Promise<string | null>;
}
