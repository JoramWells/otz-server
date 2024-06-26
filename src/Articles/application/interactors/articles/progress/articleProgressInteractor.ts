import { ArticleProgressEntity } from "../../../../domain/entities/articles/ArticleProgessEntity";
import { IArticleProgressInteractor } from "../../../interfaces/articles/progress/IArticleProgressInteractor";
import { IArticleProgressRepository } from "../../../interfaces/articles/progress/IArticleProgressRepository";

export class ArticleProgressInteractor implements IArticleProgressInteractor {
  private readonly repository: IArticleProgressRepository;

  constructor(repository: IArticleProgressRepository) {
    this.repository = repository;
  }
  // async editArticle (data: ArticleProgressEntity):Promise<ArticleProgressEntity | null>{
  //   return await this.repository.edit(data)
  // }

  async getArticleProgressById(id: string): Promise<ArticleProgressEntity | null> {
    return await this.repository.findById(id);
  }

  // async getAllArticleChaptersById(id: string): Promise<ArticleProgressEntity[] | null> {
  //   return await this.repository.findAllArticleChaptersById(id);
  // }

  async createArticleProgress(patientData: ArticleProgressEntity): Promise<ArticleProgressEntity> {
    return await this.repository.create(patientData);
  }

  async getAllArticleProgress(): Promise<ArticleProgressEntity[]> {
    return await this.repository.find();
  }

  async deleteArticleProgress(id: string): Promise<number | null> {
    return await this.repository.delete(id);
  }
}
