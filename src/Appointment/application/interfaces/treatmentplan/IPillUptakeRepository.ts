import { UptakeEntity } from "../../../domain/entities/treatmentplan/UptakeEntity";

export interface IPillUptakeRepository {
  create: (data: UptakeEntity) => Promise<UptakeEntity>;
  find: () => Promise<UptakeEntity[]>;
  findById: (id: string) => Promise<UptakeEntity | null>;
  edit: (id: string, status: boolean, queryString:ParsedQs) => Promise<UptakeEntity | null>;
  count: () => Promise<UptakeEntity | null>;
}
