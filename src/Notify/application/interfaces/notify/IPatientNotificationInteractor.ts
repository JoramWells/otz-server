import { PatientNotificationEntity } from "../../../domain/entities/notify/PatientNotificationEntity";

export interface IPatientNotificationInteractor {
  createPatientNotification: (data: PatientNotificationEntity) => Promise<PatientNotificationEntity>;
  getAllPatientNotifications: () => Promise<PatientNotificationEntity[]>;
  getPatientNotificationById: (id: string) => Promise<PatientNotificationEntity | null>;
}
