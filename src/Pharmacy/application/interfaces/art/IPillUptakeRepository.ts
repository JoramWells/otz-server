import { AdherenceAttributes } from "otz-types";

export interface IPillUptakeRepository {
  create: (data: AdherenceAttributes) => Promise<AdherenceAttributes>;
  find: (
    date: Date,
    hospitalID: string
  ) => Promise<AdherenceAttributes[] | null>;
  findById: (id: string) => Promise<AdherenceAttributes | null>;
  findByPatientID: (id: string) => Promise<AdherenceAttributes[] | null>;
  findCurrentPillUptake: (id: string) => Promise<AdherenceAttributes | null>;
  edit: (
    id: string,
    status: boolean,
    queryString: string
  ) => Promise<AdherenceAttributes | null>;
  count: () => Promise<AdherenceAttributes | null>;
  delete: (id: string) => Promise<number | null>;
}
