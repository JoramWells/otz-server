import { SchoolTermEntity } from "../../domain/entities/schoolTermEntity";

export interface ISchoolTermRepository {
  read(): Promise<SchoolTermEntity>;
  readById(input: string): Promise<SchoolTermEntity>;
  create(data: SchoolTermEntity): Promise<SchoolTermEntity>;
  update(data: SchoolTermEntity): Promise<SchoolTermEntity>;
}