export enum AppointmentFrequency {
  Bimonthly = "Bimonthly",
  Daily = "Daily",
  Weekly = "Weekly",
  Monthly = "Monthly",
  Once = 'Once'
}
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
  frequency?: AppointmentFrequency;
  text?: string;
  isRead?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AppointmentMessageAttributes {
  id?: string;
  appointmentID?: string;
  senderID?: string;
  text?: string;
}

export enum AppointmentStatusDescription {
  Upcoming = "upcoming",
  Pending = "pending",
  Missed = "missed",
  Rescheduled = "rescheduled",
  Cancelled = "cancelled",
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
  color?: string
  status: AppointmentStatusDescription;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AppModuleInterface {
  id?: string;
  title?: string;
  description?: string;
  link?: string;
  img?: string;
  isActive?: boolean;
}

export interface AppModuleSessionInterface {
  id?: string;
  appModuleID?: string;
  connectedAt?: Date;
  disconnectedAt?: Date;
  duration?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
