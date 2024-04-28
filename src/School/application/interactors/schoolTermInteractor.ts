import { SchoolTermEntity } from "../../domain/entities/schoolTermEntity";
import { ISchoolTermInteractor } from "../interfaces/ISchoolTermInteractor";
import { ISchoolTermRepository } from "../interfaces/ISchoolTermRepository";

export class SchoolTermInteractor implements ISchoolTermInteractor {
  private repository: ISchoolTermRepository;

  constructor(repository: ISchoolTermRepository) {
    this.repository = repository;
  }

  // 
  readSchoolTermById(id: string): Promise<SchoolTermEntity> {
    return this.repository.readById(id);
  }
  createSchoolTerm(input: any): Promise<SchoolTermEntity> {
    return this.repository.create(input);
  }
  readSchoolTerms(): Promise<SchoolTermEntity> {
    return this.repository.read();
  }
  updateSchoolTerm(data: any): Promise<SchoolTermEntity> {
    return this.repository.update(data);
  }
}