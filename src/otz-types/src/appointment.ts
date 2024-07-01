export interface AppointmentAttributes {
  id: string;
  userID?: string;
  patientID: string;
  patientVisitID: string;
  appointmentAgendaID?: string;
  appointmentStatusID?: string;
  appointmentDate?: string;
  appointmentTime?: string;
  rescheduledDate?: string;
  rescheduledReason?: string;
  createdAt?: Date;
  updatedAt?: Date;
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
  createdAt?: Date;
  updatedAt?: Date;
}
