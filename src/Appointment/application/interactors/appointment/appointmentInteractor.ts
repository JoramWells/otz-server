// import { type Patient } from '../../domain/entities/PatientEntity'
import { AppointmentAttributes } from 'otz-types';
import { IAppointmentInteractor } from '../../interfaces/appointment/IAppointementInteractor';
import { IAppointmentRepository } from '../../interfaces/appointment/IAppointmentRepository';


export class AppointmentInteractor implements IAppointmentInteractor {
  private readonly repository: IAppointmentRepository;

  constructor(repository: IAppointmentRepository) {
    this.repository = repository;
  }
  async starAppointment(
    id: string,
    patientID: string,
    status: boolean
  ): Promise<string | null> {
    return await this.repository.markAsStarred(id, patientID, status);
  }

  async markAsRead(id: string): Promise<boolean | null> {
    return await this.repository.markAsRead(id);
  }

    async getRecentAppointmentByPatientID(id: string, agenda: string): Promise<AppointmentAttributes | null> {
    return await this.repository.findRecentAppointmentByPatientID(id, agenda);
  }

  async rescheduleAppointment(id: string, reason: string, rescheduleDate: string): Promise<boolean | null> {
    return await this.repository.reschedule(id, reason, rescheduleDate);
  }

  async getPriorityAppointmentDetail(
    id: string
  ): Promise<AppointmentAttributes[] | null> {
    return await this.repository.findPriorityAppointmentDetail(id);
  }

  async getAllPriorityAppointments(): Promise<AppointmentAttributes[] | null> {
    return await this.repository.findAllPriorityAppointments();
  }

  async getAppointmentById(id: string): Promise<AppointmentAttributes | null> {
    return await this.repository.findById(id);
  }

  async createAppointment(
    patientData: AppointmentAttributes
  ): Promise<AppointmentAttributes> {
    return await this.repository.create(patientData);
  }

  async getAllAppointments(dateQuery: string): Promise<AppointmentAttributes[]> {
    return await this.repository.find(dateQuery);
  }
  async getAppointmentDetail(
    id: string
  ): Promise<AppointmentAttributes[] | null> {
    return await this.repository.findPatientAppointmentByID(id);
  }
}
