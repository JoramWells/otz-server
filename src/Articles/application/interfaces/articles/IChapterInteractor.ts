import { ChapterAttributes } from "otz-types";

export interface IChapterInteractor {
  createChapter: (data: ChapterAttributes) => Promise<ChapterAttributes>;
  getAllChapters: () => Promise<ChapterAttributes[]>;
  getChapterById: (id: string) => Promise<ChapterAttributes | null>;
  getAllBooksById: (id: string) => Promise<ChapterAttributes[] | null>;
}
