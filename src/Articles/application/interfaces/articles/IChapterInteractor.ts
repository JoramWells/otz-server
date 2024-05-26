import { ChapterEntity } from "../../../domain/entities/articles/ChapterEntity";

export interface IChapterInteractor {
  createChapter: (data: ChapterEntity) => Promise<ChapterEntity>;
  getAllChapters: () => Promise<ChapterEntity[]>;
  getChapterById: (id: string) => Promise<ChapterEntity | null>;
}
