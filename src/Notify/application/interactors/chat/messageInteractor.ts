import { MessagesAttributes } from "otz-types";
import { IMessageInteractor } from "../../interfaces/chats/IMessageInteractor";
// import { IMessageInteractor } from "../../interfaces/Messages/IMessageInteractor";
import { IMessageRepository } from "../../interfaces/chats/IMessageRepository";


export class MessageInteractor implements IMessageInteractor {
  private readonly repository: IMessageRepository;

  constructor(repository: IMessageRepository) {
    this.repository = repository;
  }

  async getMessagesById(id: string): Promise<MessagesAttributes[] | null> {
    return await this.repository.findById(id);
  }

  async createMessages(data: MessagesAttributes): Promise<MessagesAttributes> {
    return await this.repository.create(data);
  }

  async getAllMessages(): Promise<MessagesAttributes[]> {
    return await this.repository.find();
  }
}
