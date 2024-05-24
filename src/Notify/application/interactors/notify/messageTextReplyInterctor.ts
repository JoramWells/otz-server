import { MessageTextReplyEntity } from "../../../domain/entities/notify/MessageTextReplyEntity";
import { IMessageTextReplyInteractor } from "../../interfaces/notify/IMessageTextReplyInteractor";
import { IMessageTextReplyRepository } from "../../interfaces/notify/IMessageTextReplyRepository";



export class MessageTextReplyInteractor implements IMessageTextReplyInteractor {
  private readonly repository: IMessageTextReplyRepository;

  constructor(repository: IMessageTextReplyRepository) {
    this.repository = repository;
  }
  // async getDailyPillUptakeCount(){
  //   return await this.repository.count()
  // };

  async getMessageTextReplyById(id: string): Promise<MessageTextReplyEntity | null> {
    return await this.repository.findById(id);
  }

  async createMessageTextReply(patientData: MessageTextReplyEntity): Promise<MessageTextReplyEntity> {
    return await this.repository.create(patientData);
  }

  async getAllMessageTextReplies(): Promise<MessageTextReplyEntity[]> {
    return await this.repository.find();
  }
}
