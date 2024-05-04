// import { type Patient } from '../../domain/entities/PatientEntity'
import { AppointmentEntity } from '../../../domain/entities/AppointmentEntity';
import { IAppointmentInteractor } from '../../interfaces/appointment/IAppointementInteractor';
import { IAppointmentRepository } from '../../interfaces/appointment/IAppointmentRepository';


export class AppointmentInteractor implements IAppointmentInteractor {
  private readonly repository: IAppointmentRepository;

  constructor(repository: IAppointmentRepository) {
    this.repository = repository;
  }

  async getAppointmentById(id: string): Promise<AppointmentEntity | null> {
    return await this.repository.findById(id);
  }

  async createAppointment(patientData: AppointmentEntity): Promise<AppointmentEntity> {
    return await this.repository.create(patientData);
  }

  async getAllAppointments(): Promise<AppointmentEntity[]> {
    return await this.repository.find();
  }
}
