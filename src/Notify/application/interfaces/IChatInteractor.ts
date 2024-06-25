import { ChatEntity } from '../../domain/entities/chat/ChatEntity';

export interface IChatInteractor {
  createChat: (id1: string, id2: string) => Promise<ChatEntity>;
  getAllChats: () => Promise<ChatEntity[]>;
  getChatById: (id: string) => Promise<ChatEntity[] | null>;
}
