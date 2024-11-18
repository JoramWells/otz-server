// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
// import { logger } from '../../utils/logger'
import { Chat } from "../../../domain/models/chats/chat.model";
// import { mmasCache } from '../../../constants/appointmentCache';
import { RedisAdapter } from "../redisAdapter";

import { IPhoneNumberVerificationRepository } from "../../../application/interfaces/contacts/IPhoneNumberVerificationRepository";
// import { createClient } from 'redis'
import { PhoneNumberVerificationInterface } from "otz-types";

export class PhoneNumberVerificationRepository
  implements IPhoneNumberVerificationRepository
{
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(
    data: PhoneNumberVerificationInterface
  ): Promise<PhoneNumberVerificationInterface> {
    const newChat = await Chat.create(data);

    return newChat;
  }

  async find(): Promise<PhoneNumberVerificationInterface[]> {
    // await this.redisClient.connect();

    // check if patient
    // if ((await this.redisClient.get(mmasCache)) === null) {
    const results = await Chat.findAll({});
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

    // const results: PhoneNumberVerificationInterface[] = JSON.parse(cachedPatients);
    return results;
  }

  async findById(
    id: string
  ): Promise<PhoneNumberVerificationInterface[] | null> {
    if (id) {
      // await this.redisClient.connect();
      // if ((await this.redisClient.get(id)) === null) {
      const results = await Chat.findOne({
        where: {
          id,
        },
      });
      const recentChats: any[] = [];

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
      // const results: PhoneNumberVerificationInterface = JSON.parse(cachedData);
      // console.log("fetched from cace!");

      return recentChats;
    }
    return null;
  }
}
