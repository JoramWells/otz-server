import { AppointmentAttributes, HomeVisitConfigAttributes } from "otz-types";

export interface IHomeVisitConfigRepository {
  create: (data: HomeVisitConfigAttributes, appointmentInput: AppointmentAttributes) => Promise<HomeVisitConfigAttributes | null>;
  find: () => Promise<HomeVisitConfigAttributes[]>;
  findById: (id: string) => Promise<HomeVisitConfigAttributes | null>;
}
