// import { type Patient } from '../../domain/entities/PatientEntity'

import { ChapterEntity } from "../../../domain/entities/articles/ChapterEntity";
import { IChapterInteractor } from "../../interfaces/articles/IChapterInteractor";
import { IChapterRepository } from "../../interfaces/articles/IChapterRepository";



export class ChapterInteractor implements IChapterInteractor {
  private readonly repository: IChapterRepository;

  constructor(repository: IChapterRepository) {
    this.repository = repository;
  }

  async getChapterById(id: string): Promise<ChapterEntity | null> {
    return await this.repository.findById(id);
  }

  async createChapter(patientData: ChapterEntity): Promise<ChapterEntity> {
    return await this.repository.create(patientData);
  }

  async getAllChapters(): Promise<ChapterEntity[]> {
    return await this.repository.find();
  }
}
