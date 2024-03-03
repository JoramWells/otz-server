import { SchoolCategory } from "../../domain/entities/schoolCategoryEntities"

export interface ISchoolCategoryRepository {
  read(): Promise<SchoolCategory>;
  readById(input: string): Promise<SchoolCategory>;
  create(data: SchoolCategory): Promise<SchoolCategory>;
  update(data: SchoolCategory): Promise<SchoolCategory>;
}