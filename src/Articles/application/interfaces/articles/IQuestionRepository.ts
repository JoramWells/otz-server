import { QuestionEntity } from "../../../domain/entities/articles/QuestionEntity";

export interface IQuestionRepository {
  create: (data: QuestionEntity[]) => Promise<QuestionEntity[]>;
  find: () => Promise<QuestionEntity[]>;
  findById: (id: string) => Promise<QuestionEntity | null>;
  findAllByArticleProgressId: (id: string) => Promise<QuestionEntity[] | null>;
  delete: (id: string) => Promise<number | null>;
}
