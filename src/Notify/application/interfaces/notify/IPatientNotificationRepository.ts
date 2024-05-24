import { PatientNotificationEntity } from "../../../domain/entities/notify/PatientNotificationEntity";

export interface IPatientNotificationRepository {
  create: (data: PatientNotificationEntity) => Promise<PatientNotificationEntity>;
  find: () => Promise<PatientNotificationEntity[]>;
  findById: (id: string) => Promise<PatientNotificationEntity | null>;
}
