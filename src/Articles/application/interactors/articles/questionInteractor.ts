import { QuestionEntity } from "../../../domain/entities/articles/QuestionEntity";
import { IQuestionInteractor } from "../../interfaces/articles/IQuestionInteractor";
import { IQuestionRepository } from "../../interfaces/articles/IQuestionRepository";



export class QuestionInteractor implements IQuestionInteractor {
  private readonly repository: IQuestionRepository;

  constructor(repository: IQuestionRepository) {
    this.repository = repository;
  }

  async getQuestionById(
    id: string
  ): Promise<QuestionEntity | null> {
    return await this.repository.findById(id);
  }

  async createQuestion(
    patientData: QuestionEntity[]
  ): Promise<QuestionEntity[]> {
    return await this.repository.create(patientData);
  }

  async getAllQuestions(): Promise<QuestionEntity[]> {
    return await this.repository.find();
  }
  async deleteQuestion(id: string): Promise<number | null> {
    return await this.repository.delete(id);
  }
}
