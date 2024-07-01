import { QuestionAttributes } from "otz-types";

export interface IQuestionRepository {
  create: (data: QuestionAttributes[]) => Promise<QuestionAttributes[]>;
  find: () => Promise<QuestionAttributes[]>;
  findById: (id: string) => Promise<QuestionAttributes | null>;
  findAllByArticleProgressId: (id: string) => Promise<QuestionAttributes[] | null>;
  delete: (id: string) => Promise<number | null>;
}
