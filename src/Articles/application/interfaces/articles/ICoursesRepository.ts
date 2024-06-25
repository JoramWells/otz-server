import { CoursesEntity } from "../../../domain/entities/articles/CoursesEntity";

export interface ICoursesRepository {
  create: (data: CoursesEntity) => Promise<CoursesEntity>;
  find: () => Promise<CoursesEntity[]>;
  findById: (id: string) => Promise<CoursesEntity | null>;
  findAllCoursesById: (id: string) => Promise<CoursesEntity[] | null>;
}
