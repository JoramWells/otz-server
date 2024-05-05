// import { type Patient } from '../../domain/entities/PatientEntity'
import { AppointmentStatusEntity } from '../../../domain/entities/AppointmentStatusEntity';
import { IAppointmentStatusInteractor } from '../../interfaces/appointment/IAppointmentStatusInteractor';
import { IAppointmentStatusRepository } from '../../interfaces/appointment/IAppointmentStatusRepository';


export class appointmentStatusInteractor implements IAppointmentStatusInteractor {
  private readonly repository: IAppointmentStatusRepository;

  constructor(repository: IAppointmentStatusRepository) {
    this.repository = repository;
  }

  async getAppointmentStatusById(id: string): Promise<AppointmentStatusEntity | null> {
    return await this.repository.findById(id);
  }

  async createAppointmentStatus(patientData: AppointmentStatusEntity): Promise<AppointmentStatusEntity> {
    return await this.repository.create(patientData);
  }

  async getAllAppointmentStatus(): Promise<AppointmentStatusEntity[]> {
    return await this.repository.find();
  }
}
