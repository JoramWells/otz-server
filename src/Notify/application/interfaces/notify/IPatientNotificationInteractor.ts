import { PatientNotificationAttributes } from "otz-types";

export interface IPatientNotificationInteractor {
  createPatientNotification: (data: PatientNotificationAttributes) => Promise<PatientNotificationAttributes>;
  getAllPatientNotifications: () => Promise<PatientNotificationAttributes[]>;
  getPatientNotificationById: (id: string) => Promise<PatientNotificationAttributes | null>;
  getNotificationByPatientId: (id: string) => Promise<PatientNotificationAttributes[] | null>;
  markAsRead: (id: string) => Promise<boolean | null>;
}
