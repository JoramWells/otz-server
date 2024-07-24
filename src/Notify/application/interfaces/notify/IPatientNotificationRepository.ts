import { PatientNotificationAttributes } from "otz-types";

export interface IPatientNotificationRepository {
  create: (data: PatientNotificationAttributes[]) => Promise<PatientNotificationAttributes[] | null>;
  find: () => Promise<PatientNotificationAttributes[]>;
  findById: (id: string) => Promise<PatientNotificationAttributes | null>;
  findByPatientId: (id: string) => Promise<PatientNotificationAttributes[] | null>;
  findByCategory: (type: string) => Promise<PatientNotificationAttributes[]>;
  markAsRead: (id: string) => Promise<boolean | null>;
  // countUnread: (id: string) => Promise<number | null>;
}
