// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
// import { logger } from '../../utils/logger'
import { Op, Sequelize } from "sequelize";
import { IChatRepository } from "../../../application/interfaces/IChatRepository";
import { Chat } from "../../../domain/models/chats/chat.model";
// import { mmasCache } from '../../../constants/appointmentCache';
import { RedisAdapter } from "../redisAdapter";
import { Patient } from "../../../domain/models/patients.models";
import { Messages } from "../../../domain/models/chats/messages.model";
import { ChatAttributes } from "otz-types";
import { connect } from "../../../db/connect";
// import { createClient } from 'redis'

export class ChatRepository implements IChatRepository {
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(id1: string, id2: string, text: string): Promise<ChatAttributes> {
    const chatExists = await Chat.findOne({
      where: Sequelize.literal(`members @>ARRAY['${id1}', '${id2}']::uuid[]`),
    });

    if (chatExists) {
      console.log("Chat exists");
      // await Messages.create({
      //   chatID: chatExists.id,
      //   senderID:id2,
      //   text:text
      // })
      return chatExists;
    } else {

      return await connect.transaction(async(t)=>{
          const newChat = await Chat.create({
          members: [id1, id2],
          },{transaction:t});

          // await Messages.create({
          //   chatID: newChat.id,
          //   text,
          //   senderID: id2,
          // }, {transaction:t});
    // console.log("created ne cat");

          return newChat
      })

   

    }
  }

  async find(): Promise<ChatAttributes[]> {
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

    // const results: ChatAttributes[] = JSON.parse(cachedPatients);
    return results;
  }

  async findById(id: string): Promise<ChatAttributes[] | null> {
    if (id) {
      // await this.redisClient.connect();
      // if ((await this.redisClient.get(id)) === null) {
      const results = await Chat.findAll({
        include: [
          {
            model: Messages,
            attributes: ["text", "createdAt"],
            limit: 1,
            order: [["createdAt", "DESC"]],
          },
        ],
        where: {
          members: {
            [Op.contains]: [id],
          },
        },
      });
      const recentChats: any[] = [];
      if (results) {
        const chatPromises = results.map(async (chat) => {
          if (chat) {
            const otherMemberID = chat.members?.find(
              (memberID) => memberID !== id
            );
            const receivers = await Patient.findOne({
              attributes: ["id", "firstName", "middleName"],
              where: {
                id: otherMemberID,
              },
            });
            return {
              chat: chat.dataValues,
              receiver: receivers?.dataValues,
            };
          }
          return null;
        });
        const chatReceivers = await Promise.all(chatPromises);
        chatReceivers.forEach((receiver) => {
          if (receiver) {
            recentChats.push(receiver);
          }
        });
      }
      console.log('finding recent... ');

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
      // const results: ChatAttributes = JSON.parse(cachedData);
      // console.log("fetched from cace!");

      return recentChats;
    }
    return null;
  }
}
