import { SchoolTermHolidayEntity } from "../../domain/entities/schoolTermHolidayEntity";
import { ISchoolTermHolidayInteractor } from "../interfaces/ISchoolTermHolidayInteractor";
import { ISchoolTermHolidayRepository } from "../interfaces/ISchoolTermHolidayRepository";

export class SchoolTermHolidayInteractor implements ISchoolTermHolidayInteractor {
  private repository: ISchoolTermHolidayRepository;

  constructor(repository: ISchoolTermHolidayRepository) {
    this.repository = repository;
  }

  //
  readSchoolTermHolidayById(id: string): Promise<SchoolTermHolidayEntity> {
    return this.repository.readById(id);
  }
  createSchoolTermHoliday(input: any): Promise<SchoolTermHolidayEntity> {
    return this.repository.create(input);
  }
  readSchoolTermHolidays(): Promise<SchoolTermHolidayEntity> {
    return this.repository.read();
  }
  updateSchoolTermHoliday(data: any): Promise<SchoolTermHolidayEntity> {
    return this.repository.update(data);
  }
}