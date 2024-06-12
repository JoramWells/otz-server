import { QuestionAttributes } from "../../models/articles/question.model";

export class QuestionEntity implements QuestionAttributes {
  constructor(
    public id: string,
    public question: string,
    public choices: string,
    public answer: string,
    public articleID: string
  ) {}
}
