import { PatientNotificationAttributes } from "otz-types";

export interface IPatientNotificationInteractor {
  createPatientNotification: (data: PatientNotificationAttributes[] ) => Promise<PatientNotificationAttributes[] | null>;
  getAllPatientNotifications: () => Promise<PatientNotificationAttributes[]>;
  getPatientNotificationById: (id: string) => Promise<PatientNotificationAttributes | null>;
  getNotificationByPatientId: (id: string) => Promise<PatientNotificationAttributes[] | null>;
  getNotificationByCategory: (type: string) => Promise<PatientNotificationAttributes[]>;
  markAsRead: (id: string) => Promise<boolean | null>;
  // getUnreadNotifications: (id: string) => Promise<number | null>;
}
