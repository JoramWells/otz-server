import { SchoolTermHolidayEntity } from "../../domain/entities/schoolTermHolidayEntity";

export interface ISchoolTermHolidayInteractor {
  createSchoolTermHoliday(input: any): Promise<SchoolTermHolidayEntity>;
  readSchoolTermHolidays(): Promise<SchoolTermHolidayEntity>;
  readSchoolTermHolidayById(id: string): Promise<SchoolTermHolidayEntity>;
  updateSchoolTermHoliday(data: any): Promise<SchoolTermHolidayEntity>;
}