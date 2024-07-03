// import { type Patient } from '../../domain/entities/PatientEntity'
import { ChatAttributes } from 'otz-types';
import { IChatInteractor } from '../interfaces/IChatInteractor'
import { IChatRepository} from '../interfaces/IChatRepository'

export class ChatInteractor implements IChatInteractor {
  private readonly repository: IChatRepository;

  constructor(repository: IChatRepository) {
    this.repository = repository;
  }

  async getChatById(id: string): Promise<ChatAttributes[] | null> {
    return await this.repository.findById(id);
  }

  async createChat(id1: string, id2: string, text: string): Promise<ChatAttributes> {
    return await this.repository.create(id1, id2, text);
  }

  async getAllChats(): Promise<ChatAttributes[]> {
    return await this.repository.find();
  }
}
