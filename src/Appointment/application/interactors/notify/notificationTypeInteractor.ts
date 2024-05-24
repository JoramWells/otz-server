
import { NotificationTypeEntity } from "../../../domain/entities/notify/NotificationTypeEntity";
import { INotificationTypeInteractor } from "../../interfaces/notify/INotificationTypeInteractor";
import { INotificationTypeRepository } from "../../interfaces/notify/INotificationTypeRepository";

export class NotificationTypeInteractor implements INotificationTypeInteractor {
  private readonly repository: INotificationTypeRepository;

  constructor(repository: INotificationTypeRepository) {
    this.repository = repository;
  }
  
  async getNotificationTypeById(id: string): Promise<NotificationTypeEntity | null> {
    return await this.repository.findById(id);
  }

  async createNotificationType(patientData: NotificationTypeEntity): Promise<NotificationTypeEntity> {
    return await this.repository.create(patientData);
  }

  async getAllNotificationTypes(): Promise<NotificationTypeEntity[]> {
    return await this.repository.find();
  }
}
