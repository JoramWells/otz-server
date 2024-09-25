import { AttendeesAttributes } from "otz-types";
import { IAttendeesRepository } from "../../../application/interfaces/events/IAttendeesRepository";
import { RedisAdapter } from "../redisAdapter";
import { Attendee } from "../../../domain/models/events/attendees.model";

export class AttendeeRepository implements IAttendeesRepository {
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(
    data: AttendeesAttributes
  ): Promise<AttendeesAttributes> {
    const results: AttendeesAttributes = await Attendee.create(data);
    // await this.redisClient.del(appointmentStatusCache);
    return results;
  }

  async find(): Promise<AttendeesAttributes[]> {
    
    // check if patient
    // if ((await this.redisClient.get(appointmentStatusCache)) === null) {
      const results = await Attendee.findAll({});
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

    // const results: AttendeesAttributes[] = JSON.parse(cachedPatients);
    return results;
  }

  async findById(id: string): Promise<AttendeesAttributes | null> {
    // if ((await this.redisClient.get(id)) === null) {
      const results: Attendee | null = await Attendee.findOne({
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
    // const results: AttendeesAttributes = JSON.parse(cachedData);
    // console.log("fetched from cace!");

    return results;
  }
}
