import { MessageEntity } from "../../../domain/entities/chat/MessageEntity";

export interface IMessageRepository {
  create: (data: MessageEntity) => Promise<MessageEntity>;
  find: () => Promise<MessageEntity[]>;
  findById: (id: string) => Promise<MessageEntity[] | null>;
}
