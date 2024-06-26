import { ChapterProgressEntity } from "../../../../domain/entities/articles/ChapterProgessEntity";
import { IChapterProgressInteractor } from "../../../interfaces/articles/progress/IChapterProgressInteractor";
import { IChapterProgressRepository } from "../../../interfaces/articles/progress/IChapterProgressRepository";


export class ChapterProgressInteractor implements IChapterProgressInteractor {
  private readonly repository: IChapterProgressRepository;

  constructor(repository: IChapterProgressRepository) {
    this.repository = repository;
  }

  async getChapterProgressById(
    id: string
  ): Promise<ChapterProgressEntity | null> {
    return await this.repository.findById(id);
  }

  async createChapterProgress(
    patientData: ChapterProgressEntity
  ): Promise<ChapterProgressEntity> {
    return await this.repository.create(patientData);
  }

  async getAllChapterProgress(): Promise<ChapterProgressEntity[]> {
    return await this.repository.find();
  }
  async deleteChapterProgress(id: string): Promise<number | null> {
    return await this.repository.delete(id);
  }
}
