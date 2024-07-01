import { NotificationSubCategoryAttributes } from "otz-types";
import { INotificationSubCategoryInteractor } from "../../interfaces/notify/INotificationSubCategoryInteractor";
import { INotificationSubCategoryRepository } from "../../interfaces/notify/INotificationSubCategoryRepository";




export class NotificationSubCategoryInteractor implements INotificationSubCategoryInteractor {
  private readonly repository: INotificationSubCategoryRepository;

  constructor(repository: INotificationSubCategoryRepository) {
    this.repository = repository;
  }
  
  async getNotificationSubCategoryById(id: string): Promise<NotificationSubCategoryAttributes | null> {
    return await this.repository.findById(id);
  }

  async createNotificationSubCategory(patientData: NotificationSubCategoryAttributes): Promise<NotificationSubCategoryAttributes> {
    return await this.repository.create(patientData);
  }

  async getAllNotificationSubCategories(): Promise<NotificationSubCategoryAttributes[]> {
    return await this.repository.find();
  }
}
