import { ChatAttributes } from "otz-types";

export interface IChatRepository {
  create: (data: ChatAttributes) => Promise<ChatAttributes>;
  find: () => Promise<ChatAttributes[]>;
  findById: (id: string) => Promise<ChatAttributes | null>;
}
