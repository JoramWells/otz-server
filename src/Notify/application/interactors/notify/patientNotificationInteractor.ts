import { PatientNotificationAttributes } from "otz-types";
import { IPatientNotificationInteractor } from "../../interfaces/notify/IPatientNotificationInteractor";
import { IPatientNotificationRepository } from "../../interfaces/notify/IPatientNotificationRepository";



export class PatientNotificationInteractor implements IPatientNotificationInteractor {
  private readonly repository: IPatientNotificationRepository;

  constructor(repository: IPatientNotificationRepository) {
    this.repository = repository;
  }
  async getNotificationByCategory(type: string): Promise<PatientNotificationAttributes[]>{
    return await this.repository.findByCategory(type)
  };

  async getPatientNotificationById(
    id: string
  ): Promise<PatientNotificationAttributes | null> {
    return await this.repository.findById(id);
  }

  async getNotificationByPatientId(
    id: string
  ): Promise<PatientNotificationAttributes[] | null> {
    return await this.repository.findByPatientId(id);
  }

  async markAsRead(
    id: string
  ): Promise<boolean | null> {
    return await this.repository.markAsRead(id);
  }

  async createPatientNotification(
    patientData: PatientNotificationAttributes
  ): Promise<PatientNotificationAttributes> {
    return await this.repository.create(patientData);
  }

  async getAllPatientNotifications(): Promise<PatientNotificationAttributes[]> {
    return await this.repository.find();
  }
}
