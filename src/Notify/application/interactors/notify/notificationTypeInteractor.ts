
import { NotificationTypeAttributes } from "otz-types";
import { INotificationTypeInteractor } from "../../interfaces/notify/INotificationTypeInteractor";
import { INotificationTypeRepository } from "../../interfaces/notify/INotificationTypeRepository";

export class NotificationTypeInteractor implements INotificationTypeInteractor {
  private readonly repository: INotificationTypeRepository;

  constructor(repository: INotificationTypeRepository) {
    this.repository = repository;
  }
  
  async getNotificationTypeById(id: string): Promise<NotificationTypeAttributes | null> {
    return await this.repository.findById(id);
  }

  async createNotificationType(patientData: NotificationTypeAttributes): Promise<NotificationTypeAttributes> {
    return await this.repository.create(patientData);
  }

  async getAllNotificationTypes(): Promise<NotificationTypeAttributes[]> {
    return await this.repository.find();
  }
}
