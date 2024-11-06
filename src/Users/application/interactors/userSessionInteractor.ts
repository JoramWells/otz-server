import { UserSessionLogInterface } from "otz-types";
import { IUserSessionInteractor } from "../interfaces/IUserSessionInteractor";
import { IUserSessionRepository } from "../interfaces/IUserSessionRepository";

export class UserSessionInteractor implements IUserSessionInteractor {
  private readonly repository: IUserSessionRepository;

  constructor(repository: IUserSessionRepository) {
    this.repository = repository;
  }

  async editUserSession(
    data: UserSessionLogInterface
  ): Promise<UserSessionLogInterface | null> {
    return await this.repository.edit(data);
  }



  async getUserSessionById(id: string): Promise<UserSessionLogInterface[] | null> {
    return await this.repository.findById(id);
  }


  async createUserSession(
    patientData: UserSessionLogInterface,
  ): Promise<string | null> {
    return await this.repository.create(patientData );
  }

  async getAllUserSessions(): Promise<UserSessionLogInterface[]> {
    return await this.repository.find();
  }

 

  //
  async deleteUserSession(id: string): Promise<number | null> {
    return await this.repository.delete(id);
  }


}
