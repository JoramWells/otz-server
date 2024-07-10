import { FriendRequestsAttributes } from "otz-types";

export interface IRequestInteractor {
  createRequests: (data: FriendRequestsAttributes) => Promise<FriendRequestsAttributes>;
  getAllRequests: () => Promise<FriendRequestsAttributes[]>;
  getAllFriendRequestsByPatientId: (id: string) => Promise<FriendRequestsAttributes[] | null>;
  getRequestsById: (id: string) => Promise<FriendRequestsAttributes[] | null>;
}
