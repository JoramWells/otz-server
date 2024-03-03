import { ClassEntity } from "../../domain/entities/classEntities";
import { ISchoolClassInteractor } from "../interfaces/IClassInteractor";
import { IClassRepository } from "../interfaces/IClassRepository";

export class ClassInteractor implements ISchoolClassInteractor {
  private repository: IClassRepository;

  constructor(repository: IClassRepository) {
    this.repository = repository;
  }
  readClassById(id: string): Promise<ClassEntity> {
    return this.repository.readById(id);
  }
  createClass(input: any): Promise<ClassEntity> {
    return this.repository.create(input);
  }
  readClasses(): Promise<ClassEntity> {
    return this.repository.read();
  }
  updateClass(data: any): Promise<ClassEntity> {
    return this.repository.update(data);
  }
}