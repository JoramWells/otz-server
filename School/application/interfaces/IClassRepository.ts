import { ClassEntity } from "../../domain/entities/classEntities"

export interface IClassRepository {
  read(): Promise<ClassEntity>;
  readById(input: string): Promise<ClassEntity>;
  create(data: ClassEntity): Promise<ClassEntity>;
  update(data: ClassEntity): Promise<ClassEntity>;
}