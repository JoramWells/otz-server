import { MessagesAttributes } from "otz-types";

export interface IMessageRepository {
  create: (data: MessagesAttributes) => Promise<MessagesAttributes>;
  find: () => Promise<MessagesAttributes[]>;
  findById: (id: string) => Promise<MessagesAttributes[] | null>;
}
