import { MessageTextReplyEntity } from "../../../domain/entities/notify/MessageTextReplyEntity";

export interface IMessageTextReplyInteractor {
  createMessageTextReply: (data: MessageTextReplyEntity) => Promise<MessageTextReplyEntity>;
  getAllMessageTextReplies: () => Promise<MessageTextReplyEntity[]>;
  getMessageTextReplyById: (id: string) => Promise<MessageTextReplyEntity | null>;
}
