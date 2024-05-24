import { NotificationEntity } from "../../../domain/entities/notify/NotificationEntity";
import { INotificationInteractor } from "../../interfaces/notify/INotificationInteractor";
import { INotificationRepository } from "../../interfaces/notify/INotificationRepository";




export class NotificationInteractor implements INotificationInteractor {
  private readonly repository: INotificationRepository;

  constructor(repository: INotificationRepository) {
    this.repository = repository;
  }
  
  async getNotificationById(id: string): Promise<NotificationEntity | null> {
    return await this.repository.findById(id);
  }

  async createNotification(patientData: NotificationEntity): Promise<NotificationEntity> {
    return await this.repository.create(patientData);
  }

  async getAllNotifications(): Promise<NotificationEntity[]> {
    return await this.repository.find();
  }
}
