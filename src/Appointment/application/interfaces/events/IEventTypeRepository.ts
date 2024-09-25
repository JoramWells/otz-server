import { EventTypeAttributes } from "otz-types";

export interface IEventTypeRepository {
  create: (data: EventTypeAttributes) => Promise<EventTypeAttributes>;
  find: () => Promise<EventTypeAttributes[]>;
  findById: (id: string) => Promise<EventTypeAttributes | null>;

}
