import { AppointmentAgendaEntity } from '../../../domain/entities/AppointmentAgendaEntity';

export interface IAppointmentAgendaRepository {
  create: (data: AppointmentAgendaEntity ) => Promise<AppointmentAgendaEntity>;
  find: () => Promise<AppointmentAgendaEntity[]>;
  findById: (id: string) => Promise<AppointmentAgendaEntity | null>;
}
