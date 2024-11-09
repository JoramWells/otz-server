/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { Op } from 'sequelize'
import { type IPatientRepository } from '../../application/interfaces/IPatientRepository'
import { patientCache } from '../../constants'
import { connect } from '../../domain/db/connect'
import { Hospital } from '../../domain/models/hospital/hospital.model'
import { NextOfKin } from '../../domain/models/nextOfKin.model'
import { generateDefaultHashedPassword, Patient } from '../../domain/models/patients.models'
import { School } from '../../domain/models/school/school.model'
import { logger } from '../../utils/logger'
import bcrypt from 'bcrypt'
// import { createClient } from 'redis'
import { RedisAdapter } from './redisAdapter'
import { NextOfKinInterface, PatientAttributes } from 'otz-types'

export class PatientRepository implements IPatientRepository {
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }
  async important(id: string, isImportant: boolean): Promise<string | null> {
    await this.redisClient.del(patientCache);
    await this.redisClient.del(id);
    const results = await Patient.findByPk(id);
    if (results) {
      results.isImportant = isImportant;
      results.save();
    }
    return null;
  }

  async create(
    data: PatientAttributes,
    nextOfKinData: NextOfKinInterface
  ): Promise<string | null> {
    // const { firstName, middleName, lastName, dob, phoneNo, cccNo, occupationID, sex, hospitalID, schoolID, idNo } = data
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
          // await PatientVisits.create({ patientID, userID }, { transaction: t });
        }
      })
      .then(() => {
        results = "Successfully registered a New Patient";
      });

    // const patientPatientAttributes: PatientAttributes = {
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

  async findAllPMTCTPatients(): Promise<PatientAttributes[]> {
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

  async findImportant(limit: number): Promise<PatientAttributes[]> {
    if (limit) {
      return await Patient.findAll({
        limit,
        where: {
          isImportant: true,
        },
      });
    }
    return await Patient.findAll({
      where: {
        isImportant: true,
      },
    });
  }

  async findOTZ(): Promise<PatientAttributes[]> {
    const results = await Patient.findAll({
      where: {
        dob: {
          [Op.lte]: new Date().setFullYear(new Date().getFullYear() - 24),
        },
      },
    });
    return results;
  }

  async find(): Promise<PatientAttributes[]> {
        const currentDate = new Date();
    const maxDate = new Date(
      currentDate.setFullYear(currentDate.getFullYear()) - 25
    );

    // await this.redisClient.connect();
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
        // where: {
        //   dob: {
        //     [Op.gte]: maxDate,
        //   },
        // },
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

    const results: PatientAttributes[] = JSON.parse(cachedPatients);
    return results;
  }

  async findUsers(): Promise<PatientAttributes[]> {
    // await this.redisClient.connect();
    // check if patient
    // if ((await this.redisClient.get(patientCache)) === null) {
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
      where: {
        role: "clinician",
      },
    });
    logger.info({ message: "Fetched from db!" });
    console.log("fetched from db!");
    // set to cace
    // await this.redisClient.set(patientCache, JSON.stringify(results));

    return results;
  }

  async findById(id: string): Promise<PatientAttributes | null> {
    // await this.redisClient.connect()
    // if (await this.redisClient.get(id) === null) {
    //   const results: Patient | null = await Patient.findOne({
    //     where: {
    //       id
    //     }
    //   })

    //   const patientResults: PatientAttributes = {
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
    // const results: PatientAttributes = JSON.parse(cachedData)
    // console.log('fetched patient from cace!')
    const results: Patient | null = await Patient.findOne({
      where: {
        id,
      },
    });
    if (results === null) {
      console.log(results, "resultx");
    }

    return results;
  }

  async findPatientByUserId(id: string): Promise<PatientAttributes | null> {
    // await this.redisClient.connect()
    // if (await this.redisClient.get(id) === null) {
    //   const results: Patient | null = await Patient.findOne({
    //     where: {
    //       id
    //     }
    //   })

    
    //   const patientResults: PatientAttributes = {
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
    // const results: PatientAttributes = JSON.parse(cachedData)
    // console.log('fetched patient from cace!')
    const results: Patient | null = await Patient.findOne({
      where: {
        userID: id,
      },
      attributes:['id', 'avatar']
    });
    if (results === null) {
      console.log(results, "resultx");
    }
    console.log(results, "founde");

    return results;
  }

  async editAvatar(
    id: string,
    avatar: string
  ): Promise<PatientAttributes | null> {
    // delete cache
    await this.redisClient.del(patientCache);
    await this.redisClient.del(id as string);

    const results = await Patient.findOne({
      where: {
        id,
      },
    });

    if (results) {
      results.avatar = avatar;
      await results.save();
    }
    return results;
  }

  //
  async editPassword(
    id: string,
    password: string
  ): Promise<PatientAttributes | null> {
    // delete cache
    await this.redisClient.del(patientCache);
    await this.redisClient.del(id as string);

    const results = await Patient.findOne({
      where: {
        id,
      },
    });

    if (results) {
      results.password = password;
      await results.save();
    }
    return results;
  }

  //
  async editUsername(
    id: string,
    username: string
  ): Promise<PatientAttributes | null> {
    // delete cache
    await this.redisClient.del(patientCache);
    await this.redisClient.del(id as string);

    const results = await Patient.findOne({
      where: {
        id,
      },
    });

    if (results) {
      results.username = username;
      await results.save();
    }
    return results;
  }

  async edit(data: PatientAttributes): Promise<PatientAttributes | null> {
    const { id, firstName, middleName, lastName, phoneNo, role, populationType, dob, dateConfirmedPositive, hospitalID, password } = data;

    // delete cache
    await this.redisClient.del(patientCache);
    await this.redisClient.del(id as string);

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
      results.populationType = populationType;
      results.role = role;
      results.dob = dob;
      results.hospitalID = hospitalID;

      if(dateConfirmedPositive && dateConfirmedPositive?.length > 0){
        results.dateConfirmedPositive = dateConfirmedPositive;
      }

      if(password && password?.length > 0){
        const hashPassword = await generateDefaultHashedPassword(password);
        results.password = hashPassword;
      }
      await results.save();
    }
    return results;
  }

  //
  async login(
    cccNo: string,
    password: string
  ): Promise<PatientAttributes | null> {
    try {
      const user: Patient | null = await Patient.findOne({
        where: { cccNo: cccNo },
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

  //
  async delete(id: string): Promise<number | null> {
    await this.redisClient.del(patientCache);
    await this.redisClient.del(id as string);
    const results: number | null = await Patient.destroy({
      where: {
        id,
      },
    });
    console.log("deleted cache!!");

    return results;
  }
}
