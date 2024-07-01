import { NotificationCategoryAttributes } from "otz-types";
import { INotificationCategoryInteractor } from "../../interfaces/notify/INotificationCategoryInteractor";
import { INotificationCategoryRepository } from "../../interfaces/notify/INotificationCategoryRepository";



export class NotificationCategoryInteractor implements INotificationCategoryInteractor {
  private readonly repository: INotificationCategoryRepository;

  constructor(repository: INotificationCategoryRepository) {
    this.repository = repository;
  }
  
  async getNotificationCategoryById(id: string): Promise<NotificationCategoryAttributes | null> {
    return await this.repository.findById(id);
  }

  async createNotificationCategory(patientData: NotificationCategoryAttributes): Promise<NotificationCategoryAttributes> {
    return await this.repository.create(patientData);
  }

  async getAllNotificationCategories(): Promise<NotificationCategoryAttributes[]> {
    return await this.repository.find();
  }
}
