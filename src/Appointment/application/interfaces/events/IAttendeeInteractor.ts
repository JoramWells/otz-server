import { AttendeesAttributes } from "otz-types";

export interface IAttendeeInteractor {
  createAttendee: (
    data: AttendeesAttributes
  ) => Promise<AttendeesAttributes>;
  getAllAttendees: () => Promise<AttendeesAttributes[]>;
  getAttendeeById: (id: string) => Promise<AttendeesAttributes | null>;
 
}
