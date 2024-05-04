import { AppointmentStatusAttributes } from '../models/appointment/appointmentStatus.model';

export class AppointmentStatusEntity implements AppointmentStatusAttributes {
  constructor(
    public id?: string,
    public userID?: string,
    public patientID?: string,
    public appointmentAgendaID?: string,
    public appointmentStatusID?: string,
    public appointmentDate?: string,
    public appointmentTime?: string
  ) {}
}
