import { ClassEntity } from '../../domain/entities/classEntities';

export interface ISchoolClassInteractor {
  createClass(input: any): Promise<ClassEntity>;
  readClasses(): Promise<ClassEntity>;
  readClassById(id: string): Promise<ClassEntity>;
  updateClass(data: any): Promise<ClassEntity>;
}