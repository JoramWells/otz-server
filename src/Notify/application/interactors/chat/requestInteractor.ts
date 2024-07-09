import { FriendRequestsAttributes } from "otz-types";
import { IRequestRepository } from "../../interfaces/chats/IRequestRepository";
import { IRequestInteractor } from "../../interfaces/chats/IRequestInteractor";

export class RequestInteractor implements IRequestInteractor {
  private readonly repository: IRequestRepository;

  constructor(repository: IRequestRepository) {
    this.repository = repository;
  }

  async getRequestsById(id: string): Promise<FriendRequestsAttributes[] | null> {
    return await this.repository.findById(id);
  }

  async createRequests(data: FriendRequestsAttributes): Promise<FriendRequestsAttributes> {
    return await this.repository.create(data);
  }

  async getAllRequests(): Promise<FriendRequestsAttributes[]> {
    return await this.repository.find();
  }
}
