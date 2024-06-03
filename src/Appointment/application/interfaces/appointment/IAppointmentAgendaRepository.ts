import { AppointmentAgendaEntity } from '../../../domain/entities/AppointmentAgendaEntity';

export interface IAppointmentAgendaRepository {
  create: (data: AppointmentAgendaEntity) => Promise<AppointmentAgendaEntity>;
  delete: (id: string) => Promise<number | null>;
  find: () => Promise<AppointmentAgendaEntity[]>;
  findById: (id: string) => Promise<AppointmentAgendaEntity | null>;
}
