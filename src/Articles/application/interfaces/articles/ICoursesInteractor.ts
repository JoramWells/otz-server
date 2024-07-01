import { CoursesAttributes } from "otz-types";

export interface ICoursesInteractor {
  createCourses: (data: CoursesAttributes) => Promise<CoursesAttributes>;
  getAllCourses: () => Promise<CoursesAttributes[]>;
  getCoursesById: (id: string) => Promise<CoursesAttributes[] | null>;
  // getAllCoursesById: (id: string) => Promise<CoursesAttributes[] | null>;
}
