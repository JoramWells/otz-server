import { ChapterAttributes } from "otz-types";

export interface IChapterRepository {
  create: (data: ChapterAttributes) => Promise<ChapterAttributes>;
  find: () => Promise<ChapterAttributes[]>;
  findById: (id: string) => Promise<ChapterAttributes | null>;
  findAllBooksById: (id: string) => Promise<ChapterAttributes[] | null>;
}
