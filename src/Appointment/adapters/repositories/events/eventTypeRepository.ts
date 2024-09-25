import { EventTypeAttributes } from "otz-types";
import { IEventTypeRepository } from "../../../application/interfaces/events/IEventTypeRepository";
import { RedisAdapter } from "../redisAdapter";
import { EventType } from "../../../domain/models/events/eventType.model";


export class EventTypeRepository implements IEventTypeRepository {
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(
    data: EventTypeAttributes
  ): Promise<EventTypeAttributes> {
    const results: EventTypeAttributes = await EventType.create(data);
    // await this.redisClient.del(appointmentStatusCache);
    return results;
  }

  async find(): Promise<EventTypeAttributes[]> {
    
    // check if patient
    // if ((await this.redisClient.get(appointmentStatusCache)) === null) {
      const results = await EventType.findAll({});
      // logger.info({ message: "Fetched from db!" });
      // console.log("fetched from db!");
      // set to cace
      // await this.redisClient.set(appointmentStatusCache, JSON.stringify(results));

      // return results;
    // }
    // const cachedPatients: string | null = await this.redisClient.get(
    //   appointmentStatusCache
    // );
    // if (cachedPatients === null) {
    //   return [];
    // }
    // logger.info({ message: "Fetched from cache!" });
    // console.log("fetched from cache!");

    // const results: EventTypeAttributes[] = JSON.parse(cachedPatients);
    return results;
  }

  async findById(id: string): Promise<EventTypeAttributes | null> {
    // if ((await this.redisClient.get(id)) === null) {
      const results: EventType | null = await EventType.findOne({
        where: {
          id,
        },
      });

      // const patientResults: AppointmentEntity = {
      //   firstName: results?.firstName,
      //   middleName: results?.middleName,
      //   sex: results?.sex,
      //   phoneNo: results?.phoneNo,
      //   idNo: results?.idNo,
      //   occupationID: results?.occupationID,
      // };
    //   await this.redisClient.set(id, JSON.stringify(results));

    //   return results;
    // }

    // const cachedData: string | null = await this.redisClient.get(id);
    // if (cachedData === null) {
    //   return null;
    // }
    // const results: EventTypeAttributes = JSON.parse(cachedData);
    // console.log("fetched from cace!");

    return results;
  }
}
