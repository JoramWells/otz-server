// import { type Patient } from '../../domain/entities/PatientEntity'
import { AppointmentStatusAttributes } from 'otz-types';
import { IAppointmentStatusInteractor } from '../../interfaces/appointment/IAppointmentStatusInteractor';
import { IAppointmentStatusRepository } from '../../interfaces/appointment/IAppointmentStatusRepository';


export class appointmentStatusInteractor implements IAppointmentStatusInteractor {
  private readonly repository: IAppointmentStatusRepository;

  constructor(repository: IAppointmentStatusRepository) {
    this.repository = repository;
  }

  async getAppointmentStatusById(id: string): Promise<AppointmentStatusAttributes | null> {
    return await this.repository.findById(id);
  }

  async createAppointmentStatus(patientData: AppointmentStatusAttributes): Promise<AppointmentStatusAttributes> {
    return await this.repository.create(patientData);
  }

  async getAllAppointmentStatus(): Promise<AppointmentStatusAttributes[]> {
    return await this.repository.find();
  }
}
