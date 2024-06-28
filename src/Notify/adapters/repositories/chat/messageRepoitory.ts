// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
// import { logger } from '../../utils/logger'
import { Op, Sequelize } from 'sequelize';
// import { mmasCache } from '../../../constants/appointmentCache';
import { RedisAdapter } from '../redisAdapter'
import { IMessageRepository } from '../../../application/interfaces/chats/IMessageRepository';
import { MessageEntity } from '../../../domain/entities/chat/MessageEntity';
import { Messages } from '../../../domain/models/chats/messages.model';
// import { createClient } from 'redis'

export class MessagesRepository implements IMessageRepository {
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(data: MessageEntity  ): Promise<MessageEntity> {


      const results = await Messages.create(data)
      return results


  }

  async find(): Promise<MessageEntity[]> {
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

    // const results: MessageEntity[] = JSON.parse(cachedPatients);
    return results;
  }

  async findById(id: string): Promise<MessageEntity[] | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
      const results: Messages[] | null = await Messages.findAll({
        where:{
          chatID:id
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
    // const results: MessageEntity = JSON.parse(cachedData);
    // console.log("fetched from cace!");

    return results;
  }
}
