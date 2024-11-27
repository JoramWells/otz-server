// import { type Patient } from '../../domain/entities/PatientEntity'
import { AppointmentAttributes } from 'otz-types';
import { IAppointmentInteractor } from '../../interfaces/appointment/IAppointementInteractor';
import { IAppointmentRepository } from '../../interfaces/appointment/IAppointmentRepository';
import { AppointmentResponseInterface } from '../../../domain/models/appointment/appointment.model';
import { UniqueAppointmentInterface } from '../../../entities/UniqueAppointmentAgendaEntity';


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

  async getRecentAppointmentByPatientID(
    id: string,
    agenda: string
  ): Promise<AppointmentAttributes | null> {
    return await this.repository.findRecentAppointmentByPatientID(id, agenda);
  }

  //
  async getUniqueAppointmentAgenda(
    hospitalID: string,
    dateQuery: string
  ): Promise<UniqueAppointmentInterface[] | null | undefined> {
    return await this.repository.findUniqueAppointmentAgenda(
      hospitalID,
      dateQuery
    );
  }

  async rescheduleAppointment(
    id: string,
    reason: string,
    rescheduleDate: string
  ): Promise<boolean | null> {
    return await this.repository.reschedule(id, reason, rescheduleDate);
  }

  async getPriorityAppointmentDetail(
    id: string
  ): Promise<AppointmentAttributes[] | null> {
    return await this.repository.findPriorityAppointmentDetail(id);
  }

  async getAllPriorityAppointments(
    hospitalID: string
  ): Promise<AppointmentAttributes[] | null | undefined> {
    return await this.repository.findAllPriorityAppointments(hospitalID);
  }

  async getAppointmentById(id: string): Promise<AppointmentAttributes | null> {
    return await this.repository.findById(id);
  }

  async createAppointment(
    patientData: AppointmentAttributes
  ): Promise<AppointmentAttributes> {
    return await this.repository.create(patientData);
  }

  async getAllAppointments(
    dateQuery: string,
    hospitalID: string,
    page: number,
    pageSize: number,
    searchQuery: string
  ): Promise<AppointmentResponseInterface | null> {
    return await this.repository.find(
      dateQuery,
      hospitalID,
      page,
      pageSize,
      searchQuery
    );
  }
  async getAppointmentDetail(
    id: string
  ): Promise<AppointmentAttributes[] | null> {
    return await this.repository.findPatientAppointmentByID(id);
  }

  //
  async getStarredPatientAppointments(
    hospitalID: string,
    page: number,
    pageSize: number,
    searchQuery: string
  ): Promise<AppointmentResponseInterface | null | undefined> {
    return await this.repository.findStarredPatientAppointments(hospitalID, page, pageSize, searchQuery);
  }
}
