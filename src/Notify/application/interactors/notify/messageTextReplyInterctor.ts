import { MessageTextReplyAttributes } from "otz-types";
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

  async getMessageTextReplyById(id: string): Promise<MessageTextReplyAttributes | null> {
    return await this.repository.findById(id);
  }

  async createMessageTextReply(patientData: MessageTextReplyAttributes): Promise<MessageTextReplyAttributes> {
    return await this.repository.create(patientData);
  }

  async getAllMessageTextReplies(): Promise<MessageTextReplyAttributes[]> {
    return await this.repository.find();
  }
}
