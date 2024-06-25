import { CoursesEntity } from "../../../domain/entities/articles/CoursesEntity";

export interface ICoursesInteractor {
  createCourses: (data: CoursesEntity) => Promise<CoursesEntity>;
  getAllCourses: () => Promise<CoursesEntity[]>;
  getCoursesById: (id: string) => Promise<CoursesEntity | null>;
  // getAllCoursesById: (id: string) => Promise<CoursesEntity[] | null>;
}
