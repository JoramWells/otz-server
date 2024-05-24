import { ChatEntity } from '../../domain/entities/chat/ChatEntity';

export interface IChatInteractor {
  createChat: (data: ChatEntity) => Promise<ChatEntity>;
  getAllChats: () => Promise<ChatEntity[]>;
  getChatById: (id: string) => Promise<ChatEntity | null>;
}
