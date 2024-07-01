import { CoursesAttributes } from "otz-types";

export interface ICoursesRepository {
  create: (data: CoursesAttributes) => Promise<CoursesAttributes>;
  find: () => Promise<CoursesAttributes[]>;
  findById: (id: string) => Promise<CoursesAttributes[] | null>;
  findAllCoursesById: (id: string) => Promise<CoursesAttributes[] | null>;
}
