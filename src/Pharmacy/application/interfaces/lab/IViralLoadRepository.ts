import { ViralLoadInterface } from "otz-types";
import { ViralLoadResponseInterface } from "../../../entities/ViralLoadResponseInterface";
export interface IViralLoadRepository {
  create: (data: ViralLoadInterface) => Promise<ViralLoadInterface>;
  find: (
    hospitalID: string,
    page: number,
    pageSize: number,
    searchQuery: string
  ) => Promise<ViralLoadResponseInterface | null | undefined>;
  findById: (id: string) => Promise<ViralLoadInterface | null>;
  findByPatientId: (id: string) => Promise<ViralLoadInterface[] | null>;
  findCategories: (id: string) => Promise<ViralLoadInterface[] | null>;
  findSuppressionRate: (
    hospitalID: string,
    endDate: string | Date,
    startDate: Date | string
  ) => Promise<ViralLoadInterface[] | null | undefined>;
}
