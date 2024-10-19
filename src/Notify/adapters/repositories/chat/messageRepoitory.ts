// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
// import { logger } from '../../utils/logger'
import { Op, Sequelize } from 'sequelize';
// import { mmasCache } from '../../../constants/appointmentCache';
import { RedisAdapter } from '../redisAdapter'
import { IMessageRepository } from '../../../application/interfaces/chats/IMessageRepository';
import { Messages } from '../../../domain/models/chats/messages.model';
import { MessagesAttributes } from 'otz-types';
import { Chat } from '../../../domain/models/chats/chat.model';
// import { createClient } from 'redis'

export class MessagesRepository implements IMessageRepository {
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(data: MessagesAttributes  ): Promise<MessagesAttributes> {


      const results = await Messages.create(data)
      console.log('new mess!!')
      return results


  }

  async find(): Promise<MessagesAttributes[]> {
    // await this.redisClient.connect();
    
    // check if patient
    // if ((await this.redisClient.get(mmasCache)) === null) {
      const results = await Messages.findAll({});
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

    // const results: MessagesAttributes[] = JSON.parse(cachedPatients);
    return results;
  }

  
  async findById(id: string): Promise<MessagesAttributes[] | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {

          const results: Messages[] | null = await Messages.findAll({
            where: {
              chatID: id,
            },
          });
    
          return results;



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
    // const results: MessagesAttributes = JSON.parse(cachedData);
    // console.log("fetched from cace!");

    return null;
  }
}
