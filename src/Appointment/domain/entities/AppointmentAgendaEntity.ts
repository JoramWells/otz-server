import { AppointmentAgendaAttributes } from '../models/appointment/appointmentAgenda.model';

export class AppointmentAgendaEntity implements AppointmentAgendaAttributes {
  constructor(
    public id: string,
    public agendaDescription: string,
  ) {}
}
