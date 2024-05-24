import { ChatEntity } from '../../domain/entities/chat/ChatEntity';

export interface IChatRepository {
  create: (data: ChatEntity) => Promise<ChatEntity>;
  find: () => Promise<ChatEntity[]>;
  findById: (id: string) => Promise<ChatEntity | null>;
}
