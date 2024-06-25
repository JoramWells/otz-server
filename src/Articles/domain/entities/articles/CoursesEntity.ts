import { CoursesAttributes } from "../../models/articles/courses.model";

export class CoursesEntity implements CoursesAttributes {
  constructor(
    public id: string,
    public bookID: string,
    public patientID: string,
  ) {}
}
