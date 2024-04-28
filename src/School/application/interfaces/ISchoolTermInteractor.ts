import { SchoolTermEntity } from "../../domain/entities/schoolTermEntity";

export interface ISchoolTermInteractor {
  createSchoolTerm(input: any): Promise<SchoolTermEntity>;
  readSchoolTerms(): Promise<SchoolTermEntity>;
  readSchoolTermById(id: string): Promise<SchoolTermEntity>;
  updateSchoolTerm(data: any): Promise<SchoolTermEntity>;
}