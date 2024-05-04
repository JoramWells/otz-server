import { AppointmentAttributes } from '../models/appointment/appointment.model';
import { AppointmentStatusAttributes } from '../models/appointment/appointmentStatus.model';
import { type PatientAttributes } from '../models/patients.models'

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
