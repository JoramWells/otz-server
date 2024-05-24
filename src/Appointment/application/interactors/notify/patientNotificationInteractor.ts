import { PatientNotificationEntity } from "../../../domain/entities/notify/PatientNotificationEntity";
import { IPatientNotificationInteractor } from "../../interfaces/notify/IPatientNotificationInteractor";
import { IPatientNotificationRepository } from "../../interfaces/notify/IPatientNotificationRepository";



export class PatientNotificationInteractor implements IPatientNotificationInteractor{
  private readonly repository: IPatientNotificationRepository;

  constructor(repository: IPatientNotificationRepository) {
    this.repository = repository;
  }
  // async getDailyPillUptakeCount(){
  //   return await this.repository.count()
  // };

  async getPatientNotificationById(id: string): Promise<PatientNotificationEntity | null> {
    return await this.repository.findById(id);
  }

  async createPatientNotification(patientData: PatientNotificationEntity): Promise<PatientNotificationEntity> {
    return await this.repository.create(patientData);
  }

  async getAllPatientNotifications(): Promise<PatientNotificationEntity[]> {
    return await this.repository.find();
  }
}
