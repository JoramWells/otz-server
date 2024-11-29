// import { type Patient } from '../../domain/entities/PatientEntity'
import { UserInterface } from "otz-types";
import { type IUserInteractor } from "../interfaces/IUserInteractor";
import { type IUserRepository } from "../interfaces/IUserRepository";
import { UserResponseInterface } from "../../entities/UserResponseInterface";

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

  async getAllUsers(
    page: number,
    pageSize: number,
    searchQuery: string
  ): Promise<UserResponseInterface | undefined | null> {
    return await this.repository.find(
      page,
      pageSize,
      searchQuery
    );
  }

  //
  async deleteUser(id: string): Promise<number | null> {
    return await this.repository.delete(id);
  }

  async editUser(data: UserInterface): Promise<UserInterface | null> {
    return await this.repository.edit(data);
  }

  async updateUserPassword(data: UserInterface): Promise<UserInterface | null> {
    return await this.repository.editPassword(data);
  }

  async login(
    email: string,
    password: string,
    hospitalID: string
  ): Promise<UserInterface | null> {
    return await this.repository.login(email, password, hospitalID);
  }
}
