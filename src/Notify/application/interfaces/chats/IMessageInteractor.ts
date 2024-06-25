import { MessageEntity } from "../../../domain/entities/chat/MessageEntity";

export interface IMessageInteractor {
  createMessages: (data: MessageEntity) => Promise<MessageEntity>;
  getAllMessages: () => Promise<MessageEntity[]>;
  getMessagesById: (id: string) => Promise<MessageEntity[] | null>;
}
