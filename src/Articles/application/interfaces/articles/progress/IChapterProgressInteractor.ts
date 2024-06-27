import { ChapterProgressEntity } from "../../../../domain/entities/articles/ChapterProgessEntity";

export interface IChapterProgressInteractor {
  createChapterProgress: (data: ChapterProgressEntity) => Promise<ChapterProgressEntity>;
  getAllChapterProgress: () => Promise<ChapterProgressEntity[]>;
  getChapterProgressById: (id: string) => Promise<ChapterProgressEntity | null>;
  getAllChapterProgressById: (id: string) => Promise<ChapterProgressEntity[] | null>;
  deleteChapterProgress: (id: string) => Promise<number | null>;

}
