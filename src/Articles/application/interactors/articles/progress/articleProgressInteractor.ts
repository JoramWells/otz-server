import { ArticleProgressAttributes } from "otz-types";
import { IArticleProgressInteractor } from "../../../interfaces/articles/progress/IArticleProgressInteractor";
import { IArticleProgressRepository } from "../../../interfaces/articles/progress/IArticleProgressRepository";

export class ArticleProgressInteractor implements IArticleProgressInteractor {
  private readonly repository: IArticleProgressRepository;

  constructor(repository: IArticleProgressRepository) {
    this.repository = repository;
  }
  // async editArticle (data: ArticleProgressAttributes):Promise<ArticleProgressAttributes | null>{
  //   return await this.repository.edit(data)
  // }

  async getArticleProgressById(id: string): Promise<ArticleProgressAttributes | null> {
    return await this.repository.findById(id);
  }

  async getAllArticleProgressByChapterID(id: string): Promise<ArticleProgressAttributes[] | null> {
    return await this.repository.findAllProgress(id);
  }

  async createArticleProgress(patientData: ArticleProgressAttributes): Promise<ArticleProgressAttributes> {
    return await this.repository.create(patientData);
  }

  async getAllArticleProgress(): Promise<ArticleProgressAttributes[]> {
    return await this.repository.find();
  }

  async deleteArticleProgress(id: string): Promise<number | null> {
    return await this.repository.delete(id);
  }
}
