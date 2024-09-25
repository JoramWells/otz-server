import { AttendeesAttributes } from "otz-types";
import { IAttendeesRepository } from "../../interfaces/events/IAttendeesRepository";
import { IAttendeeInteractor } from "../../interfaces/events/IAttendeeInteractor";


export class AttendeeInteractor implements IAttendeeInteractor {
  private readonly repository: IAttendeesRepository;

  constructor(repository: IAttendeesRepository) {
    this.repository = repository;
  }


  async createAttendee(
    patientData: AttendeesAttributes
  ): Promise<AttendeesAttributes> {
    return await this.repository.create(patientData);
  }

  async getAllAttendees(): Promise<AttendeesAttributes[]> {
    return await this.repository.find();
  }
  async getAttendeeById(id: string): Promise<AttendeesAttributes | null> {
    return await this.repository.findById(id)
  }
}
