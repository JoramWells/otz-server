import { AppointmentStatusEntity } from "../../../domain/entities/AppointmentStatusEntity";

export interface IAppointmentStatusInteractor {
  createAppointmentStatus: (data: AppointmentStatusEntity) => Promise<AppointmentStatusEntity>;
  getAllAppointmentStatus: () => Promise<AppointmentStatusEntity[]>;
  getAppointmentStatusById: (id: string) => Promise<AppointmentStatusEntity | null>;
}
