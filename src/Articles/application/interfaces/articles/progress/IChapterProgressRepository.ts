import { ChapterProgressEntity } from "../../../../domain/entities/articles/ChapterProgessEntity";

export interface IChapterProgressRepository {
  create: (data: ChapterProgressEntity) => Promise<ChapterProgressEntity>;
  find: () => Promise<ChapterProgressEntity[]>;
  findById: (id: string) => Promise<ChapterProgressEntity | null>;
  findChapterProgressById: (id: string) => Promise<ChapterProgressEntity[] | null>;
  delete: (id: string) => Promise<number | null>;
}
