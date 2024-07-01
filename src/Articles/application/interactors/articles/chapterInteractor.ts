// import { type Patient } from '../../domain/entities/PatientEntity'

import { ChapterAttributes } from "otz-types";
import { IChapterInteractor } from "../../interfaces/articles/IChapterInteractor";
import { IChapterRepository } from "../../interfaces/articles/IChapterRepository";



export class ChapterInteractor implements IChapterInteractor {
  private readonly repository: IChapterRepository;

  constructor(repository: IChapterRepository) {
    this.repository = repository;
  }

  async getChapterById(id: string): Promise<ChapterAttributes | null> {
    return await this.repository.findById(id);
  }

  async createChapter(patientData: ChapterAttributes): Promise<ChapterAttributes> {
    return await this.repository.create(patientData);
  }

  async getAllChapters(): Promise<ChapterAttributes[]> {
    return await this.repository.find();
  }

  async getAllBooksById(id: string): Promise<ChapterAttributes[] | null> {
    return await this.repository.findAllBooksById(id);
  }
}
