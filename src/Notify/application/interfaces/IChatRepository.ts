import { ChatAttributes } from "otz-types";

export interface IChatRepository {
  create: (id1: string, id2: string, text: string) => Promise<ChatAttributes>;
  find: () => Promise<ChatAttributes[]>;
  findById: (id: string) => Promise<ChatAttributes[] | null>;
}
