import { AppointmentMessageAttributes } from "otz-types";
import { IAppointmentMessageInteractor } from "../../interfaces/appointment/IAppointmentMessageInteractor";
import { IAppointmentMessageRepository } from "../../interfaces/appointment/IAppointmentMessageRepository";

export class AppointmentMessageInteractor implements IAppointmentMessageInteractor {
  private readonly repository: IAppointmentMessageRepository;

  constructor(repository: IAppointmentMessageRepository) {
    this.repository = repository;
  }

  async getAppointmentMessagesById(id: string): Promise<AppointmentMessageAttributes[] | null> {
    return await this.repository.findById(id);
  }

  async createAppointmentMessages(data: AppointmentMessageAttributes): Promise<AppointmentMessageAttributes> {
    return await this.repository.create(data);
  }

  async getAllAppointmentMessages(): Promise<AppointmentMessageAttributes[]> {
    return await this.repository.find();
  }
}
