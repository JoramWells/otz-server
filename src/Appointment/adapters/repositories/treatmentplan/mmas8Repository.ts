// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
// import { logger } from '../../utils/logger'
import { MMASEightAttributes, MMASFourAttributes } from 'otz-types';
import { IMMASEightRepository } from '../../../application/interfaces/treatmentplan/IMMAS8Repository';
import { connect } from '../../../db/connect';
import { MMASFour } from '../../../domain/models/treatmentplan/mmas4.model';
import { MMASEight } from '../../../domain/models/treatmentplan/mmas8.model';
import { RedisAdapter } from '../redisAdapter'
import { mmas8Cache } from '../../../constants/appointmentCache';
// import { createClient } from 'redis'

export class MMASEightRepository implements IMMASEightRepository {
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(
    data4: MMASFourAttributes,
    data: MMASEightAttributes
  ): Promise<MMASEightAttributes> {
        const { patientID, patientVisitID } = data;

        if (await this.redisClient.get(patientID)) {
          await this.redisClient.del(patientID);
        }
        if (await this.redisClient.get(patientVisitID)) {
          await this.redisClient.del(patientVisitID);
        }
    return await connect.transaction(async (t) => {
      const mmas4Results = await MMASFour.create(data4, { transaction: t });
      const mmasFourID = mmas4Results.id;
      const results = await MMASEight.create(
        {
          mmasFourID,
          ...data,
        },
        { transaction: t }
      );

      return results;
    });
    // 

  }

  async find(): Promise<MMASEightAttributes[]> {
    // await this.redisClient.connect();
    // // check if patient
    if ((await this.redisClient.get(mmas8Cache)) === null) {
    const results = await MMASEight.findAll({});
    // logger.info({ message: "Fetched from db!" });
    // console.log("fetched from db!");
    // set to cace
    await this.redisClient.set(mmas8Cache, JSON.stringify(results));

    return results;
    }
    const cachedPatients: string | null = await this.redisClient.get(
      mmas8Cache
    );
    if (cachedPatients === null) {
      return [];
    }
    await this.redisClient.disconnect();
    // logger.info({ message: "Fetched from cache!" });
    console.log("fetched from cache!");

    const results: MMASEightAttributes[] = JSON.parse(cachedPatients);
    return results;
  }

  async findById(id: string): Promise<MMASEightAttributes | null> {
    // await this.redisClient.connect();
    if ((await this.redisClient.get(id)) === null) {
    const results: MMASEight | null = await MMASEight.findOne({
      where: {
        patientVisitID: id,
      },
    });


      await this.redisClient.set(id, JSON.stringify(results));

      return results;
    }

    const cachedData: string | null = await this.redisClient.get(id);
    if (cachedData === null) {
      return null;
    }
    const results: MMASEightAttributes = JSON.parse(cachedData);
    console.log("fetched from cace!");

    return results;
  }

  //
  async findByPatientId(id: string): Promise<MMASEightAttributes | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
    const results: MMASEight | null = await MMASEight.findOne({
      order:[['createdAt', 'DESC']],
      where: {
         patientID:id,
      },
    });


      await this.redisClient.set(id, JSON.stringify(results));

      return results;
    // }

    // const cachedData: string | null = await this.redisClient.get(id);
    // if (cachedData === null) {
    //   return null;
    // }
    // const results: MMASEightAttributes = JSON.parse(cachedData);
    // console.log("fetched from cace!");

    // return results;
  }
}
