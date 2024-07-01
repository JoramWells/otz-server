import { MessagesAttributes } from "otz-types";

export interface IMessageInteractor {
  createMessages: (data: MessagesAttributes) => Promise<MessagesAttributes>;
  getAllMessages: () => Promise<MessagesAttributes[]>;
  getMessagesById: (id: string) => Promise<MessagesAttributes[] | null>;
}
