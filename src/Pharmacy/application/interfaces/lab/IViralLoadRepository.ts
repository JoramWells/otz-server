import { ViralLoadInterface } from "otz-types";
export interface IViralLoadRepository {
  create: (data: ViralLoadInterface) => Promise<ViralLoadInterface>;
  find: (hospitalID: string) => Promise<ViralLoadInterface[] | null>;
  findById: (id: string) => Promise<ViralLoadInterface | null>;
  findByPatientId: (id: string) => Promise<ViralLoadInterface[] | null>;
  findCategories: (id: string) => Promise<ViralLoadInterface[] | null>;
}
