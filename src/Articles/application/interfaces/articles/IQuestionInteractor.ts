import { QuestionAttributes } from "otz-types";

export interface IQuestionInteractor {
  createQuestion: (data: QuestionAttributes[]) => Promise<QuestionAttributes[]>;
  getAllQuestions: () => Promise<QuestionAttributes[]>;
  getQuestionById: (id: string) => Promise<QuestionAttributes | null>;
  getAllQuestionByArticleProgressId: (id: string) => Promise<QuestionAttributes[] | null>;
  deleteQuestion: (id: string) => Promise<number | null>;
}
