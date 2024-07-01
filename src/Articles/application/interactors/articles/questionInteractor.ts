import { QuestionAttributes } from "otz-types";
import { IQuestionInteractor } from "../../interfaces/articles/IQuestionInteractor";
import { IQuestionRepository } from "../../interfaces/articles/IQuestionRepository";



export class QuestionInteractor implements IQuestionInteractor {
  private readonly repository: IQuestionRepository;

  constructor(repository: IQuestionRepository) {
    this.repository = repository;
  }


  async getAllQuestionByArticleProgressId(
    id: string
  ): Promise<QuestionAttributes[] | null> {
    return await this.repository.findAllByArticleProgressId(id)
  }

  async getQuestionById(id: string): Promise<QuestionAttributes | null> {
    return await this.repository.findById(id);
  }

  async createQuestion(
    patientData: QuestionAttributes[]
  ): Promise<QuestionAttributes[]> {
    return await this.repository.create(patientData);
  }

  async getAllQuestions(): Promise<QuestionAttributes[]> {
    return await this.repository.find();
  }
  async deleteQuestion(id: string): Promise<number | null> {
    return await this.repository.delete(id);
  }
}
