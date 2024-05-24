import { PatientNotificationAttributes } from "../../models/notify/patientNotifications.model";

export class PatientNotifications implements PatientNotificationAttributes {
  constructor(
    public id: string,
    public patientID: string,
    public userID: string,
    public medicineTime: string,
    public message: string
  ) {}

}
