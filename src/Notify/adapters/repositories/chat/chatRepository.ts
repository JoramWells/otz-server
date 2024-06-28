// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
// import { logger } from '../../utils/logger'
import { Op, Sequelize } from 'sequelize';
import { IChatRepository } from '../../../application/interfaces/IChatRepository';
import { ChatEntity } from '../../../domain/entities/chat/ChatEntity';
import { Chat, ChatAttributes } from '../../../domain/models/chats/chat.model';
// import { mmasCache } from '../../../constants/appointmentCache';
import { RedisAdapter } from '../redisAdapter'
import { Patient } from '../../../domain/models/patients.models';
// import { createClient } from 'redis'

export class ChatRepository implements IChatRepository {
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(id1:string, id2: string  ): Promise<ChatEntity> {

    const chatExists = await Chat.findOne({
      where: Sequelize.literal(`members @>ARRAY['${id1}', '${id2}']::uuid[]`)
    })

    if(chatExists){
      console.log('Chat exists')
      return chatExists;
    }else{
      const newChat = await Chat.create({
        members:[id1,id2]
      })
      return newChat
    }


  }

  async find(): Promise<ChatEntity[]> {
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

    // const results: ChatEntity[] = JSON.parse(cachedPatients);
    return results;
  }

  async findById(id: string): Promise<ChatEntity[] | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
      const results: ChatAttributes[] | null = await Chat.findAll({
        where: {
           members:{
            [Op.contains]:[id]
           },
        },
      });
      const recentChats = [];
      if(results){
         const chatPromises = results.map(async(chat)=>{
          if(chat){
            const otherMemberID = chat.members?.find(memberID => memberID !==id)
            const receivers = await Patient.findOne({
              attributes:['firstName', 'middleName'],
              where:{
                id: otherMemberID
              }
            })
            return {
              chat: chat.dataValues,
              receiver:receivers?.dataValues}
          }
          return null
         }) 
      const chatReceivers = await Promise.all(chatPromises);
chatReceivers.forEach(receiver=>{
  if(receiver){
    recentChats.push(receiver)
  }
})
      }
      console.log(recentChats)


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
    // const results: ChatEntity = JSON.parse(cachedData);
    // console.log("fetched from cace!");

    return recentChats;
  }
}
