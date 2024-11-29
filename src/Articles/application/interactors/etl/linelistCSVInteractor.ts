// import { type Patient } from '../../domain/entities/PatientEntity'
import { LineListCSVInterface } from 'otz-types';
import { ILineListRepository } from '../../interfaces/etl/ILineListRepository';
import { ILineListCSVInteractor } from '../../interfaces/etl/ILineListInteractor';
import { LineListResponseInterface } from '../../../entities/LineListResponseInterface';


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

  async getAllLineLists(
    hospitalID: string,
    page: number,
    pageSize: number,
    searchQuery: string
  ): Promise<LineListResponseInterface | null | undefined> {
    return await this.repository.find(hospitalID, page, pageSize, searchQuery);
  }

  async getLineListById(id: string): Promise<LineListCSVInterface | null> {
    return await this.repository.findById(id);
  }
}
