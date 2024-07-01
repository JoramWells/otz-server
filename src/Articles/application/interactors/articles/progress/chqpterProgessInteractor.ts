import { ChapterProgressAttributes } from "otz-types";
import { IChapterProgressInteractor } from "../../../interfaces/articles/progress/IChapterProgressInteractor";
import { IChapterProgressRepository } from "../../../interfaces/articles/progress/IChapterProgressRepository";


export class ChapterProgressInteractor implements IChapterProgressInteractor {
  private readonly repository: IChapterProgressRepository;

  constructor(repository: IChapterProgressRepository) {
    this.repository = repository;
  }

  async getChapterProgressById(
    id: string
  ): Promise<ChapterProgressAttributes | null> {
    return await this.repository.findById(id);
  }

  async getAllChapterProgressById(
    id: string
  ): Promise<ChapterProgressAttributes[] | null> {
    return await this.repository.findChapterProgressById(id);
  }

  async createChapterProgress(
    patientData: ChapterProgressAttributes
  ): Promise<ChapterProgressAttributes> {
    return await this.repository.create(patientData);
  }

  async getAllChapterProgress(): Promise<ChapterProgressAttributes[]> {
    return await this.repository.find();
  }
  async deleteChapterProgress(id: string): Promise<number | null> {
    return await this.repository.delete(id);
  }
}
