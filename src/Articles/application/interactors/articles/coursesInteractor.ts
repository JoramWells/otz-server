// import { type Patient } from '../../domain/entities/PatientEntity'

import { CoursesEntity } from "../../../domain/entities/articles/CoursesEntity";
import { ICoursesInteractor } from "../../interfaces/articles/ICoursesInteractor";
import { ICoursesRepository } from "../../interfaces/articles/ICoursesRepository";

export class CourseInteractor implements ICoursesInteractor {
  private readonly repository: ICoursesRepository;

  constructor(repository: ICoursesRepository) {
    this.repository = repository;
  }

  async getCoursesById(id: string): Promise<CoursesEntity | null> {
    return await this.repository.findById(id);
  }

  async createCourses(patientData: CoursesEntity): Promise<CoursesEntity> {
    return await this.repository.create(patientData);
  }

  async getAllCourses(): Promise<CoursesEntity[]> {
    return await this.repository.find();
  }

  // async getAllBooksById(id: string): Promise<CoursesEntity[] | null> {
  //   return await this.repository.findAllBooksById(id);
  // }
}
