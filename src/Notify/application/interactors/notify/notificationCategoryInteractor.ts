import { NotificationCategoryEntity } from "../../../domain/entities/notify/NotificationCategoryEntity";
import { INotificationCategoryInteractor } from "../../interfaces/notify/INotificationCategoryInteractor";
import { INotificationCategoryRepository } from "../../interfaces/notify/INotificationCategoryRepository";



export class NotificationCategoryInteractor implements INotificationCategoryInteractor {
  private readonly repository: INotificationCategoryRepository;

  constructor(repository: INotificationCategoryRepository) {
    this.repository = repository;
  }
  
  async getNotificationCategoryById(id: string): Promise<NotificationCategoryEntity | null> {
    return await this.repository.findById(id);
  }

  async createNotificationCategory(patientData: NotificationCategoryEntity): Promise<NotificationCategoryEntity> {
    return await this.repository.create(patientData);
  }

  async getAllNotificationCategories(): Promise<NotificationCategoryEntity[]> {
    return await this.repository.find();
  }
}
