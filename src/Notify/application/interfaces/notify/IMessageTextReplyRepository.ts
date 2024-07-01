import { MessageTextReplyAttributes } from "otz-types";

export interface IMessageTextReplyRepository {
  create: (data: MessageTextReplyAttributes ) => Promise<MessageTextReplyAttributes>;
  find: () => Promise<MessageTextReplyAttributes[]>;
  findById: (id: string) => Promise<MessageTextReplyAttributes | null>;
}
