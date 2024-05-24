// import { type Patient } from '../../domain/entities/PatientEntity'
import { ChatEntity } from '../../domain/entities/chat/ChatEntity';
import { IChatInteractor } from '../interfaces/IChatInteractor'
import { IChatRepository} from '../interfaces/IChatRepository'

export class ChatInteractor implements IChatInteractor {
  private readonly repository: IChatRepository;

  constructor(repository: IChatRepository) {
    this.repository = repository;
  }

  async getChatById(id: string): Promise<ChatEntity | null> {
    return await this.repository.findById(id);
  }

  async createChat(patientData: ChatEntity): Promise<ChatEntity> {
    return await this.repository.create(patientData);
  }

  async getAllChats(): Promise<ChatEntity[]> {
    return await this.repository.find();
  }
}
