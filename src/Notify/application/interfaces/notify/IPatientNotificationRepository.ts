import { PatientNotificationAttributes } from "otz-types";

export interface IPatientNotificationRepository {
  create: (data: PatientNotificationAttributes) => Promise<PatientNotificationAttributes>;
  find: () => Promise<PatientNotificationAttributes[]>;
  findById: (id: string) => Promise<PatientNotificationAttributes | null>;
  findByPatientId: (id: string) => Promise<PatientNotificationAttributes[] | null>;
}
