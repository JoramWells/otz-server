// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
// import { logger } from '../../utils/logger'
import { IMMASEightRepository } from '../../../application/interfaces/treatmentplan/IMMAS8Repository';
import { connect } from '../../../db/connect';
import { MMASEightEntity } from '../../../domain/entities/treatmentplan/MMASEightEntity';
import { MMASFourEntity } from '../../../domain/entities/treatmentplan/MMASFourEntity';
import { MMASFour } from '../../../domain/models/treatmentplan/mmas4.model';
import { MMASEight } from '../../../domain/models/treatmentplan/mmas8.model';
import { RedisAdapter } from '../redisAdapter'
// import { createClient } from 'redis'

export class MMASEightRepository implements IMMASEightRepository {
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(
    data4:MMASFourEntity,
    data: MMASEightEntity
  ): Promise<MMASEightEntity> {
   return  await connect.transaction(async (t)=>{
    const mmas4Results = await MMASFour.create(data4,{transaction:t})
    const mmasFourID = mmas4Results.id
const results = await MMASEight.create(
  {
    mmasFourID,
    ...data
  },
    {transaction:t}
);

return results;
    })
    
  }

  async find(): Promise<MMASEightEntity[]> {
    // await this.redisClient.connect();
    // // check if patient
    // if ((await this.redisClient.get(mmasCache)) === null) {
      const results = await MMASEight.findAll({});
      // logger.info({ message: "Fetched from db!" });
      // console.log("fetched from db!");
      // set to cace
      // await this.redisClient.set(mmasCache, JSON.stringify(results));

      return results;
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

    // const results: MMASEightEntity[] = JSON.parse(cachedPatients);
    // return results;
  }

  async findById(id: string): Promise<MMASEightEntity | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
      const results: MMASEight | null = await MMASEight.findOne({
        where: {
          patientVisitID:id,
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
    // const results: MMASEightEntity = JSON.parse(cachedData);
    // console.log("fetched from cace!");

    return results;
  }
}