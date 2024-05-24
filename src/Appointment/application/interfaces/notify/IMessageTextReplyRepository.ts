import { MessageTextReplyEntity } from "../../../domain/entities/notify/MessageTextReplyEntity";

export interface IMessageTextReplyRepository {
  create: (data: MessageTextReplyEntity ) => Promise<MessageTextReplyEntity>;
  find: () => Promise<MessageTextReplyEntity[]>;
  findById: (id: string) => Promise<MessageTextReplyEntity | null>;
}
