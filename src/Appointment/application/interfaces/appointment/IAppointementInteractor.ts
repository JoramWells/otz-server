import { AppointmentEntity } from "../../../domain/entities/AppointmentEntity";

export interface IAppointmentInteractor {
  createAppointment: (data: AppointmentEntity) => Promise<AppointmentEntity>;
  getAllAppointments: () => Promise<AppointmentEntity[]>;
  getAppointmentById: (id: string) => Promise<AppointmentEntity | null>;
}