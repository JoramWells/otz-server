import { PatientSessionLogInterface } from "otz-types"

export interface IPatientSessionRepository {
  create: (
    data: PatientSessionLogInterface,
  ) => Promise<string | null>;
  find: () => Promise<PatientSessionLogInterface[]>;
  findById: (id: string) => Promise<PatientSessionLogInterface[] | null>;
  edit: (data: PatientSessionLogInterface) => Promise<PatientSessionLogInterface | null>;
  delete: (id: string) => Promise<number | null>;

}
