export interface AppointmentAttributes {
  id?: string;
  userID?: string;
  patientID: string;
  patientVisitID: string;
  appointmentAgendaID?: string;
  appointmentStatusID?: string;
  appointmentDate?: string;
  appointmentTime?: string;
  rescheduledDate?: string;
  rescheduledReason?: string;
  isStarred?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum AppointmentStatusDescription{
  Upcoming = 'upcoming',
  Pending = 'pending',
  Missed= 'missed',
  Rescheduled = 'rescheduled',
  Cancelled = 'cancelled'
}

export interface AppointmentAgendaAttributes {
  id: string;
  agendaDescription: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AppointmentStatusAttributes {
  id: string;
  statusDescription: string;
  status: AppointmentStatusDescription;
  createdAt?: Date;
  updatedAt?: Date;
}
