import { ChapterProgressAttributes } from "otz-types";

export interface IChapterProgressRepository {
  create: (data: ChapterProgressAttributes) => Promise<ChapterProgressAttributes>;
  find: () => Promise<ChapterProgressAttributes[]>;
  findById: (id: string) => Promise<ChapterProgressAttributes | null>;
  findChapterProgressById: (id: string) => Promise<ChapterProgressAttributes[] | null>;
  delete: (id: string) => Promise<number | null>;
}
