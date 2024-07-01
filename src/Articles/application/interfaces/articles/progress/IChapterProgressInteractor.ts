import { ChapterProgressAttributes } from "otz-types";

export interface IChapterProgressInteractor {
  createChapterProgress: (data: ChapterProgressAttributes) => Promise<ChapterProgressAttributes>;
  getAllChapterProgress: () => Promise<ChapterProgressAttributes[]>;
  getChapterProgressById: (id: string) => Promise<ChapterProgressAttributes | null>;
  getAllChapterProgressById: (id: string) => Promise<ChapterProgressAttributes[] | null>;
  deleteChapterProgress: (id: string) => Promise<number | null>;

}
