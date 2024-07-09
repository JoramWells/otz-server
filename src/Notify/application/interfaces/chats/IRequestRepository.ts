import { FriendRequestsAttributes } from "otz-types";

export interface IRequestRepository {
  create: (data: FriendRequestsAttributes) => Promise<FriendRequestsAttributes>;
  find: () => Promise<FriendRequestsAttributes[]>;
  findById: (id: string) => Promise<FriendRequestsAttributes[] | null>;
}
