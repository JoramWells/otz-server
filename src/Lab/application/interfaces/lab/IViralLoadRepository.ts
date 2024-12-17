import { ViralLoadInterface } from "otz-types";
import { ViralLoadResponseInterface } from "../../../entities/ViralLoadResponseInterface";
export interface IViralLoadRepository {
  create: (data: ViralLoadInterface) => Promise<ViralLoadInterface>;
  find: (
    hospitalID: string,
    page: number,
    pageSize: number,
    searchQuery: string,
    vlResults: string,
    vlJustification: string,
    status: string
  ) => Promise<ViralLoadResponseInterface | null | undefined>;
  findById: (id: string) => Promise<ViralLoadInterface | null>;
  findByPatientId: (id: string) => Promise<ViralLoadInterface[] | null | undefined>;
  findCategories: (id: string) => Promise<ViralLoadInterface[] | null | undefined>;
  findAllVlReasons: (
    hospitalID: string,
    dateQuery: string
  ) => Promise<ViralLoadInterface[] | null> | undefined;
  findSuppressionRate: (
    hospitalID: string,
    endDate: string | Date,
    startDate: Date | string
  ) => Promise<ViralLoadInterface[] | null | undefined>;

  //
  findStarredViralLoad: (
    hospitalID: string,
    page: number,
    pageSize: number,
    searchQuery: string
  ) => Promise<ViralLoadResponseInterface | null | undefined>;
  findRecent: (
    hospitalID: string | undefined
  ) => Promise<ViralLoadInterface[] | undefined | null>;
}
