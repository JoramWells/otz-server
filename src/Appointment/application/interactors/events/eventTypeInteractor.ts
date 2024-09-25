import { EventTypeAttributes } from "otz-types";
import { IEventTypeRepository } from "../../interfaces/events/IEventTypeRepository";
import { IEventTypeInteractor } from "../../interfaces/events/IEventTypeInteractor";


export class EventTypeInteractor implements IEventTypeInteractor {
  private readonly repository: IEventTypeRepository;

  constructor(repository: IEventTypeRepository) {
    this.repository = repository;
  }


  async createEventType(
    patientData: EventTypeAttributes
  ): Promise<EventTypeAttributes> {
    return await this.repository.create(patientData);
  }

  async getAllEventTypes(): Promise<EventTypeAttributes[]> {
    return await this.repository.find();
  }
  async getEventTypeById(id: string): Promise<EventTypeAttributes | null> {
    return await this.repository.findById(id)
  }
}
