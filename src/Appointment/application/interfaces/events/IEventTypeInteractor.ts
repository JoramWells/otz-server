import { EventTypeAttributes } from "otz-types";

export interface IEventTypeInteractor {
  createEventType: (
    data: EventTypeAttributes
  ) => Promise<EventTypeAttributes>;
  getAllEventTypes: () => Promise<EventTypeAttributes[]>;
  getEventTypeById: (id: string) => Promise<EventTypeAttributes | null>;
 
}
