import { AttendeesAttributes } from "otz-types";

export interface IAttendeesRepository {
  create: (data: AttendeesAttributes) => Promise<AttendeesAttributes>;
  find: () => Promise<AttendeesAttributes[]>;
  findById: (id: string) => Promise<AttendeesAttributes | null>;
}
