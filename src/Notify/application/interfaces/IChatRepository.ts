import { ChatEntity } from '../../domain/entities/chat/ChatEntity';

export interface IChatRepository {
  create: (id1: string, id2: string) => Promise<ChatEntity>;
  find: () => Promise<ChatEntity[]>;
  findById: (id: string) => Promise<ChatEntity[] | null>;
}
