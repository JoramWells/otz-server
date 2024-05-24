import { NotificationSubCategoryEntity } from "../../../domain/entities/notify/NotificationSubCategoryEntity";
import { INotificationSubCategoryInteractor } from "../../interfaces/notify/INotificationSubCategoryInteractor";
import { INotificationSubCategoryRepository } from "../../interfaces/notify/INotificationSubCategoryRepository";




export class NotificationSubCategoryInteractor implements INotificationSubCategoryInteractor {
  private readonly repository: INotificationSubCategoryRepository;

  constructor(repository: INotificationSubCategoryRepository) {
    this.repository = repository;
  }
  
  async getNotificationSubCategoryById(id: string): Promise<NotificationSubCategoryEntity | null> {
    return await this.repository.findById(id);
  }

  async createNotificationSubCategory(patientData: NotificationSubCategoryEntity): Promise<NotificationSubCategoryEntity> {
    return await this.repository.create(patientData);
  }

  async getAllNotificationSubCategories(): Promise<NotificationSubCategoryEntity[]> {
    return await this.repository.find();
  }
}
