// import { type Patient } from '../../domain/entities/PatientEntity'
import { AppointmentAgendaEntity } from '../../../domain/entities/AppointmentAgendaEntity';
import { IAppointmentAgendaInteractor } from '../../interfaces/appointment/IAppointmentAgendaInteractor';
import { IAppointmentAgendaRepository } from '../../interfaces/appointment/IAppointmentAgendaRepository';


export class appointmentAgendaInteractor implements IAppointmentAgendaInteractor {
  private readonly repository: IAppointmentAgendaRepository;

  constructor(repository: IAppointmentAgendaRepository) {
    this.repository = repository;
  }

  async getAppointmentAgendaById(id: string): Promise<AppointmentAgendaEntity | null> {
    return await this.repository.findById(id);
  }

    async deleteAppointmentAgenda(id: string): Promise<number | null> {
    return await this.repository.delete(id);
  }

  async createAppointmentAgenda(patientData: AppointmentAgendaEntity): Promise<AppointmentAgendaEntity> {
    return await this.repository.create(patientData);
  }

  async getAllAppointmentAgendas(): Promise<AppointmentAgendaEntity[]> {
    return await this.repository.find();
  }
}
