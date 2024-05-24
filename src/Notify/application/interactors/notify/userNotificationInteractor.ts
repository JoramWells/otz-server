import { UserNotificationEntity } from "../../../domain/entities/notify/UserNotificationEntity.model";
import { IUserNotificationInteractor } from "../../interfaces/notify/IUserNotificationInteractor";
import { IUserNotificationRepository } from "../../interfaces/notify/IUserNotificationRepository";



export class UserNotificationInteractor implements IUserNotificationInteractor{
  private readonly repository: IUserNotificationRepository;

  constructor(repository: IUserNotificationRepository) {
    this.repository = repository;
  }
  // async getDailyPillUptakeCount(){
  //   return await this.repository.count()
  // };

  async getUserNotificationById(id: string): Promise<UserNotificationEntity | null> {
    return await this.repository.findById(id);
  }

  async createUserNotification(data: UserNotificationEntity): Promise<UserNotificationEntity> {
    return await this.repository.create(data);
  }

  async getAllUserNotifications(): Promise<UserNotificationEntity[]> {
    return await this.repository.find();
  }
}
