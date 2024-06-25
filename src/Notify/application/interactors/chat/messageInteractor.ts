// import { MessageEntity } from "../../../domain/entities/Message/MessageEntity";
import { MessageEntity } from "../../../domain/entities/chat/MessageEntity";
import { IMessageInteractor } from "../../interfaces/chats/IMessageInteractor";
// import { IMessageInteractor } from "../../interfaces/Messages/IMessageInteractor";
import { IMessageRepository } from "../../interfaces/chats/IMessageRepository";


export class MessageInteractor implements IMessageInteractor {
  private readonly repository: IMessageRepository;

  constructor(repository: IMessageRepository) {
    this.repository = repository;
  }

  async getMessagesById(id: string): Promise<MessageEntity[] | null> {
    return await this.repository.findById(id);
  }

  async createMessages(data: MessageEntity): Promise<MessageEntity> {
    return await this.repository.create(data);
  }

  async getAllMessages(): Promise<MessageEntity[]> {
    return await this.repository.find();
  }
}
