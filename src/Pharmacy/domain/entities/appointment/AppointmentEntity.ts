import { type AppointmentAttributes } from '../../models/appointment/appointment.model'

export class AppointmentEntity implements AppointmentAttributes {
  constructor (
    public patientID: string,
    public patientVisitID: string,
    public userID?: string,
    public appointmentAgendaID?: string,
    public appointmentStatusID?: string,
    public appointmentDate?: Date,
    public appointmentTime?: string,
    public id?: string
  ) {}
}
