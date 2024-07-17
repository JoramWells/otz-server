// import { type Patient } from '../../domain/entities/PatientEntity'
import { LineListCSVInterface } from 'otz-types';
import { ILineListCSVInteractor } from '../../interfaces/articles/ILineListInteractor';
import { ILineListRepository } from '../../interfaces/articles/ILineListRepository';


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

  async getAllLineLists(): Promise<LineListCSVInterface[]> {
    return await this.repository.find();
  }

  async getLineListById(id: string): Promise<LineListCSVInterface | null> {
    return await this.repository.findById(id);
  }
}
