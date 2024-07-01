// import { type Patient } from '../../domain/entities/PatientEntity'

import { CoursesAttributes } from "otz-types";
import { ICoursesInteractor } from "../../interfaces/articles/ICoursesInteractor";
import { ICoursesRepository } from "../../interfaces/articles/ICoursesRepository";

export class CourseInteractor implements ICoursesInteractor {
  private readonly repository: ICoursesRepository;

  constructor(repository: ICoursesRepository) {
    this.repository = repository;
  }

  async getCoursesById(id: string): Promise<CoursesAttributes[] | null> {
    return await this.repository.findById(id);
  }

  async createCourses(patientData: CoursesAttributes): Promise<CoursesAttributes> {
    return await this.repository.create(patientData);
  }

  async getAllCourses(): Promise<CoursesAttributes[]> {
    return await this.repository.find();
  }

  // async getAllBooksById(id: string): Promise<CoursesAttributes[] | null> {
  //   return await this.repository.findAllBooksById(id);
  // }
}
