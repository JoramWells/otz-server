import { UserNotificationAttributes } from "otz-types";
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

  async getUserNotificationById(id: string): Promise<UserNotificationAttributes | null> {
    return await this.repository.findById(id);
  }

  async createUserNotification(data: UserNotificationAttributes): Promise<UserNotificationAttributes> {
    return await this.repository.create(data);
  }

  async getAllUserNotifications(): Promise<UserNotificationAttributes[]> {
    return await this.repository.find();
  }
}
