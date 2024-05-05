import { AppointmentStatusAttributes } from '../models/appointment/appointmentStatus.model';

export class AppointmentStatusEntity implements AppointmentStatusAttributes {
  constructor(
    public id: string,
    public statusDescription: string,
  ) {}
}
