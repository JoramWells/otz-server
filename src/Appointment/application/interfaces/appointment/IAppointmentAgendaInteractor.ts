import { AppointmentAgendaEntity } from "../../../domain/entities/AppointmentAgendaEntity";

export interface IAppointmentAgendaInteractor {
  createAppointmentAgenda: (data: AppointmentAgendaEntity) => Promise<AppointmentAgendaEntity>;
  getAllAppointmentAgendas: () => Promise<AppointmentAgendaEntity[]>;
  getAppointmentAgendaById: (id: string) => Promise<AppointmentAgendaEntity | null>;
}
