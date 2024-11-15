// import { type Patient } from '../../domain/entities/PatientEntity'
import { LineListCSVInterface } from 'otz-types';
import { ILineListRepository } from '../../interfaces/etl/ILineListRepository';
import { ILineListCSVInteractor } from '../../interfaces/etl/ILineListInteractor';


export class LineListCSVInteractor implements ILineListCSVInteractor {
  private readonly repository: ILineListRepository;

  constructor(repository: ILineListRepository) {
    this.repository = repository;
  }

  async createLineList(
    patientData: LineListCSVInterface
  ): Promise<LineListCSVInterface> {
    return await this.repository.create(patientData);
  }

  async getAllLineLists(hospitalID: string): Promise<LineListCSVInterface[] | null> {
    return await this.repository.find(hospitalID);
  }

  async getLineListById(id: string): Promise<LineListCSVInterface | null> {
    return await this.repository.findById(id);
  }
}
