import { ChatAttributes } from "otz-types";

export interface IChatInteractor {
  createChat: (data: ChatAttributes) => Promise<ChatAttributes>;
  getAllChats: () => Promise<ChatAttributes[]>;
  getChatById: (id: string) => Promise<ChatAttributes | null>;
}
