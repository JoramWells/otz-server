import { ImportantPatientsInterface } from "otz-types";

export interface IImportantPatientInteractor {
  createImportantPatient: (UserData: ImportantPatientsInterface) => Promise<string | null>
  getAllImportantPatients: () => Promise<ImportantPatientsInterface[]>
  getImportantPatientById: (id: string) => Promise<ImportantPatientsInterface | null>
  getImportantPatientByUserId: (id: string) => Promise<ImportantPatientsInterface[] | null>
  editImportantPatient: (data: ImportantPatientsInterface) => Promise<ImportantPatientsInterface | null>
  deleteImportantPatient: (id: string) => Promise<number | null>;

}
