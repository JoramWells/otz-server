import { AppointmentEntity } from '../../../domain/entities/AppointmentEntity';

export interface IAppointmentRepository {
  create: (data: AppointmentEntity) => Promise<AppointmentEntity>;
  find: () => Promise<AppointmentEntity[]>;
  findById: (id: string) => Promise<AppointmentEntity | null>;
  findAllAppointmentById: (id: string) => Promise<AppointmentEntity[] | null>;
  findPatientAppointmentByID:(id: string)=>Promise<AppointmentEntity[] | null>;
}
