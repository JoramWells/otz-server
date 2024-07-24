// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
// import { logger } from '../../utils/logger'
import moment from 'moment';
import { IPatientNotificationRepository } from '../../../application/interfaces/notify/IPatientNotificationRepository';
// import { mmasCache } from '../../../constants/appointmentCache';
import { PatientNotification } from '../../../domain/models/notify/patientNotifications.model';
import { Patient } from '../../../domain/models/patients.models';
import { RedisAdapter } from '../redisAdapter'
import { PatientNotificationAttributes } from 'otz-types';
import { col, fn, literal, Op } from 'sequelize';
// import { createClient } from 'redis'

export class PatientNotificationRepository implements IPatientNotificationRepository {
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(
    data: PatientNotificationAttributes[]
  ): Promise<PatientNotificationAttributes[] | null> {
    const currentDate = new Date().toISOString().split("T")[0];

    // 
    const isNotified = await PatientNotification.findOne({
      where: {
        [Op.and]: [
          literal(`date_trunc('day', "createdAt") ='${currentDate}'`),
          { type: "Refill" },
        ],
      },
    });
    // 
    if(isNotified){
        console.log('Refill Notification created!!!')
    }else{
    const results = await PatientNotification.bulkCreate(data);

    return results;
    }

    // 
    return null

  }

  async find(): Promise<PatientNotificationAttributes[]> {
    const currentDate = moment().format('YYYY-MM-DD')
    // await this.redisClient.connect();
    // check if patient
    // if ((await this.redisClient.get(mmasCache)) === null) {
      const results = await PatientNotification.findAll({
        // where:{
        //   createdAt: currentDate
        // },
        include:[
          {
            model: Patient,
            attributes:['id','firstName', 'middleName']
          }
        ]
      });
      // logger.info({ message: "Fetched from db!" });
      // console.log("fetched from db!");
      // set to cace
      // await this.redisClient.set(mmasCache, JSON.stringify(results));

    //   return results;
    // }
    // const cachedPatients: string | null = await this.redisClient.get(
    //   mmasCache
    // );
    // if (cachedPatients === null) {
    //   return [];
    // }
    // await this.redisClient.disconnect();
    // logger.info({ message: "Fetched from cache!" });
    // console.log("fetched from cache!");

    // const results: PatientNotificationAttributes[] = JSON.parse(cachedPatients);
    return results;
  }

    async findByPatientId(id: string): Promise<PatientNotificationAttributes[] | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
      const results: PatientNotification[] | null = await PatientNotification.findAll({
        where: {
          patientID: id,
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
    // const results: PatientNotificationAttributes = JSON.parse(cachedData);
    // console.log("fetched from cace!");

    return results;
  }


  async findByCategory(type:string): Promise<PatientNotificationAttributes[]>{
    const results = await PatientNotification.findAll({
      where: {
        type: type,
      },
      attributes: [[fn("MAX", col("PatientNotification.createdAt")), "createdAt"], "Patient.id"],
      group:['Patient.id', 'message'],
      include: [
        {
          model: Patient,

          attributes: ["id", "firstName", "middleName"],
        },
      ],
    });

    const formattedResults = []

    for(const item in results){
      formattedResults.push(results[item].dataValues)
    }

    console.log(formattedResults)

    return formattedResults
  }
  
  async findById(id: string): Promise<PatientNotificationAttributes | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
      const results: PatientNotification | null = await PatientNotification.findOne({
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
    // const results: PatientNotificationAttributes = JSON.parse(cachedData);
    // console.log("fetched from cace!");

    return results;
  }

  async markAsRead (id: string): Promise<boolean | null> {
    const result = await PatientNotification.findOne({
      where: {
        id,
      },
    });

    if(result){
      result.isRead = true
      result.save()
      return result as any;

    }
  return null;


  }

}
