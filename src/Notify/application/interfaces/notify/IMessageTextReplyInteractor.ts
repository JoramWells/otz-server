import { MessageTextReplyAttributes } from "otz-types";

export interface IMessageTextReplyInteractor {
  createMessageTextReply: (data: MessageTextReplyAttributes) => Promise<MessageTextReplyAttributes>;
  getAllMessageTextReplies: () => Promise<MessageTextReplyAttributes[]>;
  getMessageTextReplyById: (id: string) => Promise<MessageTextReplyAttributes | null>;
}
