import { AppointmentAttributes, HomeVisitAttributes } from "otz-types"

export interface IHomeVisitRepository {
  create: (data: HomeVisitAttributes, appointmentInput: AppointmentAttributes) => Promise<HomeVisitAttributes | null>;
  find: () => Promise<HomeVisitAttributes[]>;
  findById: (id: string) => Promise<HomeVisitAttributes | null>;
  findAllById: (id: string) => Promise<HomeVisitAttributes[] | null>;
}
