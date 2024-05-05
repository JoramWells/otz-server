import { AppointmentStatusEntity } from "../../../domain/entities/AppointmentStatusEntity";

export interface IAppointmentStatusRepository {
  create: (data: AppointmentStatusEntity ) => Promise<AppointmentStatusEntity>;
  find: () => Promise<AppointmentStatusEntity[]>;
  findById: (id: string) => Promise<AppointmentStatusEntity | null>;
}
