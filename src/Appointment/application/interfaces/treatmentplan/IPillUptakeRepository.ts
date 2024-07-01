import { UptakeAttributes } from "otz-types";

export interface IPillUptakeRepository {
  create: (data: UptakeAttributes) => Promise<UptakeAttributes>;
  find: () => Promise<UptakeAttributes[]>;
  findById: (id: string) => Promise<UptakeAttributes | null>;
  edit: (id: string, status: boolean, queryString:string) => Promise<UptakeAttributes | null>;
  count: () => Promise<UptakeAttributes | null>;
}
