export interface EventTypeAttributes {
  id?: string;
  title?: string;
  description?: string;
  duration?: number;
  eventDate?:Date
  startTime?: string;
  timeZone?: string
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AttendeesAttributes {
  id?: string;
  eventTypeID?: string;
  patientID?: string
  createdAt?: Date;
  updatedAt?: Date;
}