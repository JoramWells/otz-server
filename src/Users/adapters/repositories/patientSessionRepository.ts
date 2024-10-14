/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { patientCache } from '../../constants'
import { connect } from '../../domain/db/connect'
import { logger } from '../../utils/logger'
// import { createClient } from 'redis'
import { RedisAdapter } from './redisAdapter'
import { IPatientSessionRepository } from '../../application/interfaces/IPatientSessionRepository'
import { PatientSessionLogInterface } from 'otz-types'
import { PatientSessionLog } from '../../domain/models/patientSessionLog.model'

export class PatientSessionLogRepository implements IPatientSessionRepository {
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }


  async create(
    data: PatientSessionLogInterface,
  ): Promise<string | null> {
    // const { firstName, middleName, lastName, dob, phoneNo, cccNo, occupationID, sex, hospitalID, schoolID, idNo } = data
    let results = "";
    await connect
      .transaction(async (t) => {
        const results = await PatientSessionLog.create(data, { transaction: t });


      })
      .then(() => {
        results = "Successfully registered a New Patient";
      });

    // const patientPatientSessionLogInterface: PatientSessionLogInterface = {
    //   id: results.id,
    //   firstName: results.firstName,
    //   middleName,
    //   sex,
    //   occupationID,
    //   phoneNo,
    //   idNo
    // }

    return results;
  }


  async find(): Promise<PatientSessionLogInterface[]> {
    // await this.redisClient.connect();
    // check if patient
    // if ((await this.redisClient.get(patientCache)) === null) {
      const results = await PatientSessionLog.findAll({
        // include: [
        //   { model: School, attributes: ["schoolName"] },
        //   {
        //     model: Hospital,
        //     attributes: ["hospitalName"],
        //   },
          //   {
          //     model: ViralLoad,
          //     attributes: [
          //       'id',
          //       'dateOfNextVL',
          //       'vlResults',
          //       'isValid',
          //       'dateOfCurrentVL'
          //     ]
          //   }
        // ],
      });
      logger.info({ message: "Fetched from db!" });
      console.log("fetched from db!");
      // set to cace
      await this.redisClient.set(patientCache, JSON.stringify(results));

      return results;
    // }
    // const cachedPatients: string | null = await this.redisClient.get(
    //   patientCache
    // );
    // if (cachedPatients === null) {
    //   return [];
    // }
    // await this.redisClient.disconnect()
    // logger.info({ message: "Fetched from cache!" });
    // console.log("fetched from cache!");

    // const results: PatientSessionLogInterface[] = JSON.parse(cachedPatients);
    // return results;
  }

  async findById(id: string): Promise<PatientSessionLogInterface[] | null> {
    // await this.redisClient.connect()
    // if (await this.redisClient.get(id) === null) {
    //   const results: Patient | null = await Patient.findOne({
    //     where: {
    //       id
    //     }
    //   })

    //   const patientResults: PatientSessionLogInterface = {
    //     firstName: results?.firstName,
    //     middleName: results?.middleName,
    //     sex: results?.sex,
    //     phoneNo: results?.phoneNo,
    //     idNo: results?.idNo,
    //     occupationID: results?.occupationID
    //   }
    //   await this.redisClient.set(id, JSON.stringify(patientResults))

    //   return patientResults
    // }

    // const cachedData: string | null = await this.redisClient.get(id)
    // if (cachedData === null) {
    //   return null
    // }
    // const results: PatientSessionLogInterface = JSON.parse(cachedData)
    // console.log('fetched patient from cace!')
    const results: PatientSessionLogInterface | null = await PatientSessionLog.findAll({
      where: {
        patientID:id,
      },
    });
    if (results === null) {
      console.log(results, "resultx");
    }
    console.log(results, "founde");

    return results;
  }


  async edit(data: PatientSessionLogInterface): Promise<PatientSessionLogInterface | null> {
    const { id } = data;

    // delete cache
    // await this.redisClient.del(patientCache);
    // await this.redisClient.del(id as string);

    const results = await PatientSessionLog.findOne({
      where: {
        id,
      },
    });

    // if (results) {
    //   results.firstName = firstName;
    //   results.middleName = middleName;
    //   results.lastName = lastName;
    //   results.phoneNo = phoneNo;
    //   results.role = role;
    //   await results.save();
    // }
    return results;
  }

  //

  //
  async delete(id: string): Promise<number | null> {
    // await this.redisClient.del(patientCache);
    // await this.redisClient.del(id as string);
    const results: number | null = await PatientSessionLog.destroy({
      where: {
        id,
      },
    });
    console.log("deleted cache!!");

    return results;
  }
}
