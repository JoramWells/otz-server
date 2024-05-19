// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
// import { logger } from '../../utils/logger'
import { IFollowUpChecklistRepository } from '../../../application/interfaces/treatmentplan/IFollowUpChecklistRepository';
import { FollowUpChecklistEntity } from '../../../domain/entities/treatmentplan/FollowUpChecklistEntity';
import { FollowUpChecklist } from '../../../domain/models/treatmentplan/followupChecklist.model';
// import { mmasCache } from '../../../constants/appointmentCache';
import { RedisAdapter } from '../redisAdapter'
// import { createClient } from 'redis'

export class FollowUpChecklistRepository implements IFollowUpChecklistRepository {
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(
    data: FollowUpChecklistEntity
  ): Promise<FollowUpChecklistEntity> {
    const results = await FollowUpChecklist.create(data);

    return results;
  }

  async find(): Promise<FollowUpChecklistEntity[]> {
    // await this.redisClient.connect();
    // check if patient
    // if ((await this.redisClient.get(mmasCache)) === null) {
      const results = await FollowUpChecklist.findAll({});
      // logger.info({ message: "Fetched from db!" });
      // console.log("fetched from db!");
      // set to cace
    //   await this.redisClient.set(mmasCache, JSON.stringify(results));

    //   return results;
    // }
    // const cachedPatients: string | null = await this.redisClient.get(
    //   mmasCache
    // );
    // if (cachedPatients === null) {
    //   return [];
    // }
    // await this.redisClient.disconnect();
    // // logger.info({ message: "Fetched from cache!" });
    // console.log("fetched from cache!");

    // const results: FollowUpChecklistEntity[] = JSON.parse(cachedPatients);
    return results;
  }

  async findById(id: string): Promise<FollowUpChecklistEntity | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
      const results: FollowUpChecklist | null = await FollowUpChecklist.findOne({
        where: {
          patientVisitID: id,
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
    // const results: FollowUpChecklistEntity = JSON.parse(cachedData);
    // console.log("fetched from cace!");

    return results;
  }
}
