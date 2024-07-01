/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { Op } from 'sequelize'
import { type IPatientRepository } from '../../application/interfaces/IPatientRepository'
import { patientCache } from '../../constants'
import { connect } from '../../domain/db/connect'
import { type NextOfKinEntity } from '../../domain/entities/NextOfKinEntity'
import { type PatientEntity } from '../../domain/entities/PatientEntity'
import { Hospital } from '../../domain/models/hospital/hospital.model'
import { NextOfKin } from '../../domain/models/nextOfKin.model'
import { PatientVisits } from '../../domain/models/patientVisits.model'
import { Patient } from '../../domain/models/patients.models'
import { School } from '../../domain/models/school/school.model'
import { logger } from '../../utils/logger'
import bcrypt from 'bcrypt'
// import { createClient } from 'redis'
import { RedisAdapter } from './redisAdapter'

export class PatientRepository implements IPatientRepository {
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(
    data: PatientEntity,
    nextOfKinData: NextOfKinEntity
  ): Promise<string | null> {
    // const { firstName, middleName, lastName, dob, phoneNo, cccNo, occupationID, sex, hospitalID, schoolID, idNo } = data
    console.log(nextOfKinData);
    let results = "";
    await connect
      .transaction(async (t) => {
        const results = await Patient.create(data, { transaction: t });

        //
        if (results) {
          const patientID = results.id;
          await NextOfKin.create(
            {
              patientID,
              ...nextOfKinData,
            },
            { transaction: t }
          );

          // create new visit
          await PatientVisits.create({ patientID }, { transaction: t });
        }
      })
      .then(() => {
        results = "Successfully registered a New Patient";
      });

    // const patientEntity: PatientEntity = {
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

  async findAllPMTCTPatients(): Promise<PatientEntity[]> {
    const results = await Patient.findAll({
      where: {
        sex: { [Op.or]: ["F", "female"] },
        dob: {
          [Op.lte]: new Date().setFullYear(new Date().getFullYear() - 15),
        },
      },
    });
    return results;
  }

  async findOTZ(): Promise<PatientEntity[]> {
    const results = await Patient.findAll({
      where: {
        dob: {
          [Op.lte]: new Date().setFullYear(new Date().getFullYear() - 24),
        },
      },
    });
    return results;
  }

  async find(): Promise<PatientEntity[]> {
    await this.redisClient.connect();
    // check if patient
    if ((await this.redisClient.get(patientCache)) === null) {
      const results = await Patient.findAll({
        include: [
          { model: School, attributes: ["schoolName"] },
          {
            model: Hospital,
            attributes: ["hospitalName"],
          },
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
        ],
      });
      logger.info({ message: "Fetched from db!" });
      console.log("fetched from db!");
      // set to cace
      await this.redisClient.set(patientCache, JSON.stringify(results));

      return results;
    }
    const cachedPatients: string | null = await this.redisClient.get(
      patientCache
    );
    if (cachedPatients === null) {
      return [];
    }
    // await this.redisClient.disconnect()
    logger.info({ message: "Fetched from cache!" });
    console.log("fetched from cache!");

    const results: PatientEntity[] = JSON.parse(cachedPatients);
    return results;
  }

  async findById(id: string): Promise<PatientEntity | null> {
    // await this.redisClient.connect()
    // if (await this.redisClient.get(id) === null) {
    //   const results: Patient | null = await Patient.findOne({
    //     where: {
    //       id
    //     }
    //   })

    //   const patientResults: PatientEntity = {
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
    // const results: PatientEntity = JSON.parse(cachedData)
    // console.log('fetched patient from cace!')
    const results: Patient | null = await Patient.findOne({
      where: {
        id,
      },
    });
    if (results === null) {
      console.log(results, "resultx");
    }
    console.log(results, "founde");

    return results;
  }

  async edit(data: PatientEntity): Promise<PatientEntity | null> {
    const { id, firstName, middleName, lastName, phoneNo } = data;
    const results = await Patient.findOne({
      where: {
        id,
      },
    });

    if (results) {
      results.firstName = firstName;
      results.middleName = middleName;
      results.lastName = lastName;
      results.phoneNo = phoneNo;
      await results.save();
    }
    return results;
  }

  //
  async login(
    firstName: string,
    password: string
  ): Promise<PatientEntity | null> {
    try {
      const user: Patient | null = await Patient.findOne({
        where: { firstName: firstName },
      });

      if (user !== null && user.password) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          return user;
        } else {
          console.log("Password does not match!!");
          return null;
        }
      }
      return null;
    } catch (error) {
      console.log("Error comparing password!!", error);
      throw new Error("Error logging in user");
    }
  }
}
