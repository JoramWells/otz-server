import { ChapterEntity } from "../../../domain/entities/articles/ChapterEntity";

export interface IChapterRepository {
  create: (data: ChapterEntity) => Promise<ChapterEntity>;
  find: () => Promise<ChapterEntity[]>;
  findById: (id: string) => Promise<ChapterEntity | null>;
}
