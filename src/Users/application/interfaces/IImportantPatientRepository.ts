import { ImportantPatientsInterface } from "otz-types";

export interface IImportantPatientRepository {
  create: (
    data: ImportantPatientsInterface,
  ) => Promise<string | null>;
  find: () => Promise<ImportantPatientsInterface[]>;
  findById: (id: string) => Promise<ImportantPatientsInterface[] | null>;
  edit: (data: ImportantPatientsInterface) => Promise<ImportantPatientsInterface | null>;
  delete: (id: string) => Promise<number | null>;

}
