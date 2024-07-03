import { ChatAttributes } from "otz-types";

export interface IChatInteractor {
  createChat: (id1: string, id2: string, text: string) => Promise<ChatAttributes>;
  getAllChats: () => Promise<ChatAttributes[]>;
  getChatById: (id: string) => Promise<ChatAttributes[] | null>;
}
