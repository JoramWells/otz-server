/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
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
// import { createClient } from 'redis'

export class AppointmentRepository implements IAppointmentRepository {
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(data: AppointmentEntity): Promise<AppointmentEntity> {
    const results: AppointmentAttributes = await Appointment.create(data);

    return results;
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
    await this.redisClient.disconnect();
    // logger.info({ message: "Fetched from cache!" });
    console.log("fetched from cache!");

    const results: AppointmentEntity[] = JSON.parse(cachedPatients);
    return results;
  }

  async findPatientAppointmentByID(id: string) {
    const results = Appointment.findAll({
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

    return results;
  }

  async findAllAppointmentById(id: string): Promise<AppointmentEntity[] | null>{
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
        return results
  }

  async findById(id: string): Promise<AppointmentEntity | null> {
    await this.redisClient.connect();
    if ((await this.redisClient.get(id)) === null) {
      const results: Appointment | null = await Appointment.findOne({
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
      await this.redisClient.set(id, JSON.stringify(results));

      return results;
    }

    const cachedData: string | null = await this.redisClient.get(id);
    if (cachedData === null) {
      return null;
    }
    const results: AppointmentEntity = JSON.parse(cachedData);
    console.log("fetched from cace!");

    return results;
  }
}
