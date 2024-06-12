import { QuestionEntity } from "../../../domain/entities/articles/QuestionEntity";

export interface IQuestionInteractor {
  createQuestion: (data: QuestionEntity[]) => Promise<QuestionEntity[]>;
  getAllQuestions: () => Promise<QuestionEntity[]>;
  getQuestionById: (id: string) => Promise<QuestionEntity | null>;
}
