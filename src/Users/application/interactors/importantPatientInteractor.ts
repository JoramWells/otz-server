import { ImportantPatientsInterface } from "otz-types";
import { IImportantPatientInteractor } from "../interfaces/IImportantPatientInteractor";
import { IImportantPatientRepository } from "../interfaces/IImportantPatientRepository";

export class ImportantPatientInteractor implements IImportantPatientInteractor {
  private readonly repository: IImportantPatientRepository;

  constructor(repository: IImportantPatientRepository) {
    this.repository = repository;
  }

  async editImportantPatient(
    data: ImportantPatientsInterface
  ): Promise<ImportantPatientsInterface | null> {
    return await this.repository.edit(data);
  }

  async getImportantPatientById(
    id: string
  ): Promise<ImportantPatientsInterface | null> {
    return await this.repository.findById(id);
  }

  async getImportantPatientByUserId(
    id: string
  ): Promise<ImportantPatientsInterface[] | null> {
    return await this.repository.findByUserId(id);
  }

  async createImportantPatient(
    patientData: ImportantPatientsInterface
  ): Promise<string | null> {
    return await this.repository.create(patientData);
  }

  async getAllImportantPatients(): Promise<ImportantPatientsInterface[]> {
    return await this.repository.find();
  }

  //
  async deleteImportantPatient(id: string): Promise<number | null> {
    return await this.repository.delete(id);
  }
}
