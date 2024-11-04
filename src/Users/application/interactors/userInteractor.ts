// import { type Patient } from '../../domain/entities/PatientEntity'
import { UserInterface } from 'otz-types'
import { type IUserInteractor } from '../interfaces/IUserInteractor'
import { type IUserRepository } from '../interfaces/IUserRepository'

export class UserInteractor implements IUserInteractor {
  private readonly repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  async getUserById(id: string): Promise<UserInterface | null> {
    return await this.repository.findById(id);
  }

  async createUser(patientData: UserInterface): Promise<UserInterface> {
    return await this.repository.create(patientData);
  }

  async getAllUsers(): Promise<UserInterface[]> {
    return await this.repository.find();
  }

  //
  async deleteUser(id: string): Promise<number | null> {
    return await this.repository.delete(id);
  }

  async editUser(data: UserInterface): Promise<UserInterface | null> {
    return await this.repository.edit(data);
  }

  async login(email: string, password: string): Promise<UserInterface | null> {
    return await this.repository.login(email, password);
  }
}
