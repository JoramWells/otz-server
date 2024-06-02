// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
// import { logger } from '../../utils/logger'
import { IChildCaregiverRepository } from '../../../../application/interfaces/disclosure/partial/IChildCaregiverRepository';
import { ChildCaregiverReadinessEntity } from '../../../../domain/entities/treatmentplan/disclosure/partial/ChildCaregiverReadinessEntity';
import { ChildCaregiverReadiness } from '../../../../domain/models/treatmentplan/disclosure/childCaregiverReadiness.model';
// import { mmasCache } from '../../../constants/appointmentCache';
// import { RedisAdapter } from '../redisAdapter'
// import { createClient } from 'redis'

export class ChildCaregiverReadinessRepository implements IChildCaregiverRepository {
  // private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(
    data: ChildCaregiverReadinessEntity
  ): Promise<ChildCaregiverReadinessEntity> {
    const results = await ChildCaregiverReadiness.create(data);

    return results;
  }

  async find(): Promise<ChildCaregiverReadinessEntity[]> {
    // await this.redisClient.connect();

    // check if patient
    // if ((await this.redisClient.get(mmasCache)) === null) {
    const results = await ChildCaregiverReadiness.findAll({});
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

    // const results: ChildCaregiverReadinessEntity[] = JSON.parse(cachedPatients);
    return results;
  }

  async findById(id: string): Promise<ChildCaregiverReadinessEntity | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
    const results: ChildCaregiverReadiness | null =
      await ChildCaregiverReadiness.findOne({
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
    // const results: ChildCaregiverReadinessEntity = JSON.parse(cachedData);
    // console.log("fetched from cace!");

    return results;
  }

  async findAllByVisitId(
    id: string
  ): Promise<ChildCaregiverReadinessEntity[] | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
    const results: ChildCaregiverReadiness[] | null =
      await ChildCaregiverReadiness.findAll({
        where: {
          patientVisitID: id,
        },
      });

    return results;
  }
}
