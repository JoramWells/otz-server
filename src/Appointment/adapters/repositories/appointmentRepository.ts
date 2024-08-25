/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { Op } from 'sequelize'
import { IAppointmentRepository } from '../../application/interfaces/appointment/IAppointmentRepository'
import { appointmentCache } from '../../constants/appointmentCache'
import { Appointment } from '../../domain/models/appointment/appointment.model'
import { AppointmentAgenda } from '../../domain/models/appointment/appointmentAgenda.model'
import { AppointmentStatus } from '../../domain/models/appointment/appointmentStatus.model'
import { Patient } from '../../domain/models/patients.models'
import { User } from '../../domain/models/user.model'
// import { logger } from '../../utils/logger'
import { RedisAdapter } from './redisAdapter'
import { connect } from '../../db/connect'
import { PatientVisits } from '../../domain/models/patientVisits.model'
import { AppointmentAttributes } from 'otz-types'
// import { createClient } from 'redis'

const getWeekRange = (date: Date) =>{
  const startOfWeek = new Date(date)
  const endOfWeek = new Date(date)

  startOfWeek.setDate(date.getDate()-date.getDay())
  endOfWeek.setDate(date.getDate() + (6 -date.getDay()))

  return {
    start: startOfWeek.toISOString().split('T')[0],
    end: endOfWeek.toISOString().split('T')[0]
  }
}

// 
const getMonthRange = (date:Date) =>{
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(),1)
  const endOfMonth = new Date(date.getFullYear(), date.getMonth()+1,0)
  return {
    start: startOfMonth.toISOString().split("T")[0],
    end: endOfMonth.toISOString().split("T")[0],
  };
}

// 
export class AppointmentRepository implements IAppointmentRepository {
  private readonly redisClient = new RedisAdapter();

  async findAllPriorityAppointments(): Promise<AppointmentAttributes[] | null> {
    return await Appointment.findAll({
      order: [["updatedAt", "DESC"]],
      limit: 5,
      include: [
        {
          model: Patient,
          attributes: ["id", "firstName", "middleName", 'isImportant'],
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

  //

  async markAsStarred(
    id: string,
    patientID: string,
    status: boolean
  ): Promise<string | null> {
    const isTrue = await Appointment.findByPk(id);
    const appointmentDetailID = `appointment_detail_${id}`;

    await this.redisClient.connect();
    await this.redisClient.del(appointmentCache);
    await this.redisClient.del(id);
    await this.redisClient.del(patientID);
    await this.redisClient.del(appointmentDetailID);
    if (isTrue) {
      isTrue.isStarred = status;
      await isTrue.save();
    }

    return null;
  }

  //
  async markAsRead(id: string): Promise<boolean | null> {
    const result = await Appointment.findByPk(id);
    const appointmentDetailID = `appointment_detail_${id}`;

    await this.redisClient.connect()
    await this.redisClient.del(appointmentCache)
    await this.redisClient.del(id)
    await this.redisClient.del(appointmentDetailID)

    if (result) {
      result.isRead = true;
      result.save();
      return result as any;
    }
    return null;
  }

  //
  async reschedule(
    id: string,
    reason: string,
    rescheduledDate: string
  ): Promise<boolean | null> {
    const result = await Appointment.findByPk(id);
    const rescheduleID = await AppointmentStatus.findOne({
      where: {
        statusDescription: "Rescheduled",
      },
    });

    // console.log(rescheduleID, 'reschedule id')

    if (result && rescheduleID !== null) {
      result.appointmentStatusID = rescheduleID.id;
      result.rescheduledReason = reason;
      result.rescheduledDate = rescheduledDate;
      result.appointmentDate = rescheduledDate;
      result.isRead = false;
      result.save();
      return result as any;
    }
    return null;
  }

  async findPriorityAppointmentDetail(
    id: string
  ): Promise<AppointmentAttributes[] | null> {
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

  async create(data: AppointmentAttributes): Promise<AppointmentAttributes> {
    return await connect.transaction(async (t) => {
      let results: AppointmentAttributes = await Appointment.create(data, {
        transaction: t,
      });
      
      console.log("Running transaction data...!!!", results);

      // if (results) {
      //   await PatientVisits.create(data, { transaction: t });
      // }

      const { patientID } = data;
      
      if ((await this.redisClient.get(patientID.toString())) !== null) {
        // delete individual patientCache in the db!!
        await this.redisClient.del(patientID);
      }

      // ?delete entire appointment cache
      await this.redisClient.del(appointmentCache);

      return results;
    });

    // await this.redisClient.disconnect()

    // return results;
  }

  async find(dateQuery: string): Promise<AppointmentAttributes[]> {
    // await this.redisClient.connect();
    // check if patient

    const currentDate = new Date()

    
    if(dateQuery === 'weekly'){
         const { start, end } = getWeekRange(currentDate);

         // if ((await this.redisClient.get(appointmentCache)) === null) {
         const results: AppointmentAttributes[] = await Appointment.findAll({
           order: [["appointmentDate", "ASC"]],
           where: {
             createdAt: {
               [Op.not]: null,
             } as any,
             appointmentDate: {
               [Op.between]: [start, end],
             },
           },
           include: [
             {
               model: Patient,
               attributes: ["firstName", "middleName", "dob", "sex", 'isImportant'],
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
         // await this.redisClient.set(appointmentCache, JSON.stringify(results));

         return results; 
    }    else if (dateQuery === "monthly") {
          const { start, end } = getMonthRange(currentDate);

      // if ((await this.redisClient.get(appointmentCache)) === null) {
      const results: AppointmentAttributes[] = await Appointment.findAll({
        order: [["appointmentDate", "ASC"]],
        where: {
          createdAt: {
            [Op.not]: null,
          } as any,
          appointmentDate: {
            [Op.between]: [start, end],
          },
        },
        include: [
          {
            model: Patient,
            attributes: ["firstName", "middleName", "dob", "sex", 'isStarred'],
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
      // await this.redisClient.set(appointmentCache, JSON.stringify(results));

      return results;
    }


    // if ((await this.redisClient.get(appointmentCache)) === null) {
      const results: AppointmentAttributes[] = await Appointment.findAll({
        order: [["appointmentDate", "ASC"]],
        where: {
          createdAt: {
            [Op.not]: null,
          } as any,
        },
        include: [
          {
            model: Patient,
            attributes: ["firstName", "middleName", "dob", "sex", 'isStarred'],
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
      // await this.redisClient.set(appointmentCache, JSON.stringify(results));

      return results;
    // }
    // const cachedPatients: string | null = await this.redisClient.get(
    //   appointmentCache
    // );
    // if (cachedPatients === null) {
    //   return [];
    // }
    // await this.redisClient.disconnect();
    // logger.info({ message: "Fetched from cache!" });
    // console.log("fetched from cache!");

    // const results: AppointmentAttributes[] = JSON.parse(cachedPatients);
    // return results;
  }

  //
  async findRecentAppointmentByPatientID(
    id: string,
    agenda: string
  ): Promise<AppointmentAttributes | null> {
    // if ((await this.redisClient.get(id)) === null) {

    const currentDate = new  Date()

    const appointmentStatus = await AppointmentStatus.findOne({
      where: {
        statusDescription: "Completed",
      },
    });

    const appointmentAgenda = await AppointmentAgenda.findOne({
      where: {
        agendaDescription: agenda,
      },
    });

    if (appointmentStatus && appointmentAgenda) {
      const results = await Appointment.findOne({
        order: [["createdAt", "DESC"]],
        where: {
          patientID: id,
          appointmentAgendaID: appointmentAgenda.id,
          createdAt:{
            [Op.not]: currentDate
          }
        } as any,
      });

      if (results) {
        results.appointmentStatusID = appointmentStatus.id;
        await results.save();
      }

      return results;
    }

    // await this.redisClient.set(id, JSON.stringify(results));

    return null;
    // }

    // const cachedData: string | null = await this.redisClient.get(id);
    // if (cachedData === null) {
    //   return null;
    // }
    // const results: AppointmentAttributes[] = JSON.parse(cachedData);
    // console.log("fetched appointment from cace!");

    // return results;
  }

  //
  async findPatientAppointmentByID(
    id: string
  ): Promise<AppointmentAttributes[] | null> {
    // if ((await this.redisClient.get(id)) === null) {
    const results: AppointmentAttributes[] | null = await Appointment.findAll({
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
    // }

    // const cachedData: string | null = await this.redisClient.get(id);
    // if (cachedData === null) {
    //   return null;
    // }
    // const results: AppointmentAttributes[] = JSON.parse(cachedData);
    // console.log("fetched appointment from cace!");

    // return results;
  }

  async findAllAppointmentById(
    id: string
  ): Promise<AppointmentAttributes[] | null> {
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

  async findById(id: string): Promise<AppointmentAttributes | null> {
    const appointmentDetailID = `appointment_detail_${id}`
    // await this.redisClient.connect();
    if ((await this.redisClient.get(appointmentDetailID)) === null) {
      const results: AppointmentAttributes | null = await Appointment.findOne({
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

      await this.redisClient.set(appointmentDetailID, JSON.stringify(results));

      return results;
    }

    const cachedData: string | null = await this.redisClient.get(appointmentDetailID);
    if (cachedData === null) {
      return null;
    }
    const results: AppointmentAttributes = JSON.parse(cachedData);
    console.log("fetched from cace!");

    return results;
  }
}
