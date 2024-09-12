import { AppointmentAttributes, HomeVisitConfigAttributes } from "otz-types";

export interface IHomeVisitConfigRepository {
  create: (data: HomeVisitConfigAttributes) => Promise<HomeVisitConfigAttributes | null>;
  find: () => Promise<HomeVisitConfigAttributes[]>;
  findById: (id: string) => Promise<HomeVisitConfigAttributes | null>;
}
