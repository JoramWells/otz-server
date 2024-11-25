import { NotificationAttributes } from "otz-types";
import { INotificationInteractor } from "../../interfaces/notify/INotificationInteractor";
import { INotificationRepository } from "../../interfaces/notify/INotificationRepository";
import { NotificationResponseInterface } from "../../../entitties/notify/NotificationResponseInterface";




export class NotificationInteractor implements INotificationInteractor {
  private readonly repository: INotificationRepository;

  constructor(repository: INotificationRepository) {
    this.repository = repository;
  }

  async getNotificationById(
    id: string
  ): Promise<NotificationAttributes | null> {
    return await this.repository.findById(id);
  }

  async createNotification(
    patientData: NotificationAttributes
  ): Promise<NotificationAttributes> {
    return await this.repository.create(patientData);
  }

  async getAllNotifications(
    hospitalID: string,
    page: number,
    pageSize: number,
    searchQuery: string
  ): Promise<NotificationResponseInterface | null> {
    return await this.repository.find(hospitalID, page, pageSize, searchQuery);
  }
}
