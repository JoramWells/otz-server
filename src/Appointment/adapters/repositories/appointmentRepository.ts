/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { Op } from 'sequelize'
import { IAppointmentRepository } from '../../application/interfaces/appointment/IAppointmentRepository'
import { appointmentCache } from '../../constants/appointmentCache'
import { AppointmentEntity } from '../../domain/entities/AppointmentEntity'
import { Appointment, AppointmentAttributes } from '../../domain/models/appointment/appointment.model'
import { AppointmentAgenda } from '../../domain/models/appointment/appointmentAgenda.model'
import { AppointmentStatus } from '../../domain/models/appointment/appointmentStatus.model'
import { Patient } from '../../domain/models/patients.models'
import { User } from '../../domain/models/user.model'
// import { logger } from '../../utils/logger'
import { RedisAdapter } from './redisAdapter'
import { connect } from '../../db/connect'
import { PatientVisits } from '../../domain/models/patientVisits.model'
// import { createClient } from 'redis'


export class AppointmentRepository implements IAppointmentRepository {
  async findAllPriorityAppointments(): Promise<AppointmentEntity[] | null> {
    return await Appointment.findAll({
      order:[['updatedAt', 'DESC']],
      limit:5,
      include: [
        {
          model:Patient,
          attributes:['id', 'firstName','middleName']
        },
        {
          model: AppointmentStatus,
          attributes: ["id", "statusDescription"],
          where: {
            statusDescription: "Upcoming",
          },
        },
        {
          model: AppointmentAgenda,
          attributes: ["id", "agendaDescription"],
        },
      ],
    });
  }

  async findPriorityAppointmentDetail(
    id: string
  ): Promise<AppointmentEntity[] | null> {
    return await Appointment.findAll({
      where: {
        patientID: id,
      },
      include: [
        {
          model: AppointmentStatus,
          attributes: ["id", "statusDescription"],
          where: {
            statusDescription: "Upcoming",
          },
        },
        {
          model: AppointmentAgenda,
          attributes: ["id", "agendaDescription"],
        },
      ],
    });
  }
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(data: AppointmentEntity): Promise<AppointmentEntity> {
    return await connect.transaction(async (t) => {
      let results: AppointmentAttributes = await Appointment.create(data, {
        transaction: t,
      });
      if (results) {
        await PatientVisits.create(data, { transaction: t });
      }

      const { patientID } = data;
      await this.redisClient.connect();
      if ((await this.redisClient.get(patientID.toString())) !== null) {
        await this.redisClient.del(patientID);
      }
      return results;
    });

    // await this.redisClient.disconnect()

    // return results;
  }

  async find(): Promise<AppointmentEntity[]> {
    await this.redisClient.connect();
    // check if patient
    if ((await this.redisClient.get(appointmentCache)) === null) {
      const results = await Appointment.findAll({
        order: [["appointmentDate", "ASC"]],
        // where: whereCondition,
        include: [
          {
            model: Patient,
            attributes: ["firstName", "middleName", "dob", "sex"],
          },
          {
            model: User,
            attributes: ["id", "firstName", "middleName"],
          },
          {
            model: AppointmentAgenda,
            attributes: ["id", "agendaDescription"],
          },
          {
            model: AppointmentStatus,
            attributes: ["id", "statusDescription"],
          },
        ],
      });
      // logger.info({ message: "Fetched from db!" });
      // console.log("fetched from db!");
      // set to cace
      await this.redisClient.set(appointmentCache, JSON.stringify(results));

      return results;
    }
    const cachedPatients: string | null = await this.redisClient.get(
      appointmentCache
    );
    if (cachedPatients === null) {
      return [];
    }
    // await this.redisClient.disconnect();
    // logger.info({ message: "Fetched from cache!" });
    console.log("fetched from cache!");

    const results: AppointmentEntity[] = JSON.parse(cachedPatients);
    return results;
  }

  async findPatientAppointmentByID(
    id: string
  ): Promise<AppointmentEntity[] | null> {
    await this.redisClient.connect();
    if ((await this.redisClient.get(id)) === null) {
      const results: AppointmentEntity[] | null = await Appointment.findAll({
        where: {
          patientID: id,
        },
        include: [
          {
            model: AppointmentAgenda,
            attributes: ["agendaDescription"],
          },
          {
            model: AppointmentStatus,
            attributes: ["statusDescription"],
          },
          {
            model: User,
            attributes: ["firstName", "middleName"],
          },
        ],
      });

      await this.redisClient.set(id, JSON.stringify(results));

      return results;
    }

    const cachedData: string | null = await this.redisClient.get(id);
    if (cachedData === null) {
      return null;
    }
    const results: AppointmentEntity[] = JSON.parse(cachedData);
    console.log("fetched appointment from cace!");

    return results;
  }

  async findAllAppointmentById(
    id: string
  ): Promise<AppointmentEntity[] | null> {
    const results = await Appointment.findAll({
      where: {
        id,
      },
      include: [
        {
          model: AppointmentAgenda,
          attributes: ["agendaDescription"],
        },
        {
          model: AppointmentStatus,
          attributes: ["statusDescription"],
        },
        {
          model: User,
          attributes: ["firstName", "middleName"],
        },
      ],
    });
    return results;
  }

  async findById(id: string): Promise<AppointmentEntity | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
    //   const results: Appointment | null = await Appointment.findOne({
    //     where: {
    //       id,
    //     },
    //   });

    //   // const patientResults: AppointmentEntity = {
    //   //   firstName: results?.firstName,
    //   //   middleName: results?.middleName,
    //   //   sex: results?.sex,
    //   //   phoneNo: results?.phoneNo,
    //   //   idNo: results?.idNo,
    //   //   occupationID: results?.occupationID,
    //   // };
    //   await this.redisClient.set(id, JSON.stringify(results));

    //   return results;
    // }

    // const cachedData: string | null = await this.redisClient.get(id);
    // if (cachedData === null) {
    //   return null;
    // }
    // const results: AppointmentEntity = JSON.parse(cachedData);
    // console.log("fetched from cace!");
    const results: Appointment | null = await Appointment.findOne({
      where: {
        id,
      },
    });

    return results;
  }
}
